import { DatePipe, NgClass } from "@angular/common";
import {
  Component,
  computed,
  effect,
  HostListener,
  inject,
  signal,
  viewChild,
} from "@angular/core";
import { SortEvent } from "primeng/api";
import { ContextMenu, ContextMenuModule } from "primeng/contextmenu";
import { DialogModule } from "primeng/dialog";
import { ProgressBarModule } from "primeng/progressbar";
import { Table, TableModule } from "primeng/table";
import { getMessages } from "../../i18n/i18n";
import { TranslatePipe } from "../../i18n/translate.pipe";
import { VoyageIconComponent } from "../../icon";
import { MessageComponent } from "../../message/message.component";
import { isToday, isYesterday } from "../../model/dates";
import {
  getSortFieldFromLocalstorage,
  getSortOrderFromLocalstorage,
  writeSortToLocalstorage,
} from "../../model/localstorage";
import {
  File,
  FileSortFields,
  isFileEqual,
  isFileSortField,
  sortFiles,
} from "../../model/model";
import { prettyBytes } from "../../model/utils";
import { PreviewComponent } from "../../preview/preview.component";
import { BaseViewComponent } from "../base-view.component";

@Component({
  selector: "ngx-voyage-list-view",
  templateUrl: "./list-view.component.html",
  imports: [
    NgClass,
    TableModule,
    ContextMenu,
    ContextMenuModule,
    DialogModule,
    PreviewComponent,
    MessageComponent,
    ProgressBarModule,
    TranslatePipe,
    VoyageIconComponent,
  ],
  providers: [DatePipe],
})
export class ListViewComponent extends BaseViewComponent {
  datePipe = inject(DatePipe);

  dataTable = viewChild<Table>("dataTable");

  sortOrder = signal<number>(0);
  sortField = signal<FileSortFields | undefined>(undefined);
  sortedFiles = computed(() => {
    if (this.sortOrder() == undefined || this.sortField() == undefined) {
      return this.filteredFiles();
    }
    return sortFiles(
      [...this.filteredFiles()],
      this.sortField(),
      this.sortOrder(),
    );
  });

  prettyBytes = prettyBytes;

  constructor() {
    super();
    this.sortField.set(getSortFieldFromLocalstorage());
    this.sortOrder.set(getSortOrderFromLocalstorage());

    effect(() => {
      writeSortToLocalstorage(this.sortOrder(), this.sortField());
    });
  }

  onSort(event: SortEvent) {
    if (
      event.order === 1 &&
      this.sortOrder() === -1 &&
      this.sortField() === event.field
    ) {
      this.sortField.set(undefined);
      this.sortOrder.set(0);
      this.dataTable()?.reset();
    } else {
      if (isFileSortField(event.field)) {
        this.sortField.set(event.field);
      }
      this.sortOrder.set(event.order ?? 0);
    }
  }

  @HostListener("window:keydown", ["$event"])
  onKeydown(event: KeyboardEvent) {
    const selected = this.selectedFile();
    if (event.key === "ArrowUp") {
      this.selectFileWithOffset(-1);
    }
    if (event.key === "ArrowDown") {
      this.selectFileWithOffset(1);
    }
    if (event.key === "Enter" && selected) {
      this.onDoubleClick(selected);
    }
  }

  selectFileWithOffset(offset: -1 | 1) {
    const selected = this.selectedFile();
    if (selected == undefined) {
      this.selectFirstFile();
    } else {
      for (let i = 0; i < this.sortedFiles().length; i++) {
        const file = this.sortedFiles()[i];
        if (
          isFileEqual(file, selected) &&
          i + offset >= 0 &&
          i + offset < this.sortedFiles().length
        ) {
          this.selectFile(this.sortedFiles()[i + offset]);
          break;
        }
      }
    }
  }

  selectFirstFile() {
    this.selectFile(this.sortedFiles()[0]);
  }

  selectFile(file: File) {
    for (let i = 0; i < this.sortedFiles().length; i++) {
      const f = this.sortedFiles()[i];
      if (isFileEqual(file, f)) {
        const fileDom = document.querySelector(
          `tr[data-rowIndex="${i}"]`,
        ) as HTMLTableRowElement;
        fileDom.focus();
      }
    }
    this.selectedFile.set(file);
  }

  formatDate(file: File) {
    const modifiedDate =
      file.modifiedDate instanceof Date
        ? file.modifiedDate
        : new Date(file.modifiedDate);

    const timeFormat = new Intl.DateTimeFormat(navigator.language, {
      minute: "2-digit",
      hour: "2-digit",
    });
    const time = timeFormat.format(modifiedDate);
    const messages = getMessages();
    if (isToday(modifiedDate)) {
      return `${messages.TODAY_AT} ${time}`;
    } else if (isYesterday(modifiedDate)) {
      return `${messages.YESTERDAY_AT} ${time}`;
    } else {
      const dateFormat = new Intl.DateTimeFormat(navigator.language, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const date = dateFormat.format(modifiedDate);
      return `${date} ${messages.AT} ${time}`;
    }
  }
}
