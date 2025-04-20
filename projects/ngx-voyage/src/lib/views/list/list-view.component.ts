import { DatePipe, NgClass, NgTemplateOutlet } from "@angular/common";
import { Component, HostListener, inject, viewChild } from "@angular/core";
import { SortEvent } from "primeng/api";
import { ContextMenu, ContextMenuModule } from "primeng/contextmenu";
import { DialogModule } from "primeng/dialog";
import { ProgressBarModule } from "primeng/progressbar";
import { Table, TableModule } from "primeng/table";
import { getMessages } from "../../i18n/i18n";
import { TranslatePipe } from "../../i18n/translate.pipe";
import { VoyageIconComponent } from "../../icon";
import { isToday, isYesterday } from "../../model/dates";
import { File, FileSortState, isFileSortField } from "../../model/model";
import { prettyBytes } from "../../model/utils";
import { PreviewComponent } from "../../preview/preview.component";
import { BaseViewComponent } from "../base-view.component";

@Component({
  selector: "ngx-voyage-list-view",
  templateUrl: "./list-view.component.html",
  styleUrl: "./list-view.component.css",
  imports: [
    NgClass,
    TableModule,
    ContextMenu,
    ContextMenuModule,
    DialogModule,
    PreviewComponent,
    ProgressBarModule,
    TranslatePipe,
    VoyageIconComponent,
    NgTemplateOutlet,
  ],
  providers: [DatePipe],
})
export class ListViewComponent extends BaseViewComponent {
  datePipe = inject(DatePipe);

  dataTable = viewChild<Table>("dataTable");

  prettyBytes = prettyBytes;

  onSort(event: SortEvent) {
    const storeOrder = this.store.sort()?.order;
    const storeField = this.store.sort()?.field;
    if (event.order === 1 && storeOrder === -1 && storeField === event.field) {
      this.store.setSort(undefined);
      this.dataTable()?.reset();
    } else {
      const newSort: FileSortState = {
        order: event.order ?? 0,
        field: storeField ?? "name",
      };
      if (isFileSortField(event.field)) {
        newSort.field = event.field;
      }
      this.store.setSort(newSort);
    }
  }

  @HostListener("window:keydown", ["$event"])
  onKeydown(event: KeyboardEvent) {
    const selected = this.selectedFile();
    if (event.key === "ArrowUp") {
      this.selectNextOrPreviousFile(-1);
    }
    if (event.key === "ArrowDown") {
      this.selectNextOrPreviousFile(1);
    }
    if (event.key === "Enter" && selected) {
      this.onDoubleClick(selected);
    }
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
