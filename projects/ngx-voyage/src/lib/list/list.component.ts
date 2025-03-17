import { DatePipe, NgClass } from "@angular/common";
import {
  Component,
  computed,
  effect,
  HostListener,
  inject,
  input,
  model,
  OnChanges,
  output,
  signal,
  SimpleChanges,
  viewChild,
} from "@angular/core";
import { MenuItem, SortEvent } from "primeng/api";
import { ContextMenu, ContextMenuModule } from "primeng/contextmenu";
import { DialogModule } from "primeng/dialog";
import { ProgressBarModule } from "primeng/progressbar";
import { Table, TableModule } from "primeng/table";
import { getMessages, isToday, isYesterday } from "../i18n/i18n";
import { TranslatePipe } from "../i18n/translate.pipe";
import { VoyageIconComponent } from "../icon";
import { MessageComponent } from "../message/message.component";
import { canPreviewFile, getFileIcon } from "../model/file-types";
import {
  getSortFieldFromLocalstorage,
  getSortOrderFromLocalstorage,
  writeSortToLocalstorage,
} from "../model/localstorage";
import { Message } from "../model/message";
import {
  File,
  FilePreviewOutput,
  FileSortFields,
  isFileEqual,
  isFileSortField,
  sortFiles,
} from "../model/model";
import { Store } from "../model/store";
import { prettyBytes } from "../model/utils";
import { PreviewComponent } from "../preview/preview.component";

@Component({
  selector: "ngx-voyage-list",
  templateUrl: "./list.component.html",
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
export class ListComponent implements OnChanges {
  #store = inject(Store);
  datePipe = inject(DatePipe);

  contextMenu = viewChild<ContextMenu>("contextMenu");
  dataTable = viewChild<Table>("dataTable");

  path = input.required<string>();
  files = input.required<File[]>();
  message = input<Message>();
  loading = input<boolean>(false);

  filteredFiles = computed(() => {
    if (this.#store.showHiddenFiles()) {
      return this.files();
    } else {
      return this.files().filter(({ name }) => !name.startsWith("."));
    }
  });
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

  openFolder = output<string>();
  openFile = output<string>();
  previewFile = output<FilePreviewOutput>();

  prettyBytes = prettyBytes;
  getFileIcon = getFileIcon;

  selectedFile = model<File | undefined>(undefined);

  showPreview = model(false);
  previewData = signal<Blob | undefined>(undefined);

  menuItems: MenuItem[] = [
    {
      label: "Preview",
      visible: false,
      command: () => {
        const f = this.selectedFile();
        if (f) {
          this.openFilePreview(f);
        }
      },
    },
    {
      label: "Open",
      command: () => {
        const f = this.selectedFile();
        if (f) {
          this.openFileOrFolder(f);
        }
      },
    },
  ];

  constructor() {
    this.sortField.set(getSortFieldFromLocalstorage());
    this.sortOrder.set(getSortOrderFromLocalstorage());

    effect(() => {
      writeSortToLocalstorage(this.sortOrder(), this.sortField());
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["path"]) {
      this.selectedFile.set(undefined);
      this.showPreview.set(false);
    }
  }

  onDoubleClick(file: File) {
    if (canPreviewFile(file)) {
      this.selectedFile.set(file);
      this.openFilePreview(file);
    } else {
      this.openFileOrFolder(file);
    }
  }

  onMouseDown(event: MouseEvent) {
    // when using double click to open a file,
    // prevent the text node of the file name to be selected
    if (event.detail > 1) {
      event.preventDefault();
    }
  }

  openFilePreview(file: File) {
    const path = this.getTargetPath(file);
    this.previewFile.emit({
      path,
      cb: (data) => {
        this.previewData.set(data);
        this.showPreview.set(true);
      },
    });
  }

  openFileOrFolder(file: File) {
    const targetPath = this.getTargetPath(file);
    if (file.isDirectory) {
      this.openFolder.emit(targetPath);
    } else {
      this.openFile.emit(targetPath);
    }
  }

  onContextMenu(event: MouseEvent, file: File) {
    const cm = this.contextMenu();
    if (cm && event?.currentTarget && file) {
      this.selectedFile.set(file);
      this.menuItems[0].visible = canPreviewFile(file);
      this.menuItems[1].visible =
        this.#store.showOpenFile() || file.isDirectory;
      cm.target = event.currentTarget as HTMLElement;
      cm.show(event);
    }
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
    const timeFormat = new Intl.DateTimeFormat(navigator.language, {
      minute: "2-digit",
      hour: "2-digit",
    });
    const time = timeFormat.format(file.modifiedDate);
    const messages = getMessages();
    if (isToday(file.modifiedDate)) {
      return `${messages.TODAY_AT} ${time}`;
    } else if (isYesterday(file.modifiedDate)) {
      return `${messages.YESTERDAY_AT} ${time}`;
    } else {
      const dateFormat = new Intl.DateTimeFormat(navigator.language, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const date = dateFormat.format(file.modifiedDate);
      return `${date} ${messages.AT} ${time}`;
    }
  }

  getTargetPath(file: File) {
    return `${this.path()}/${file.name}`.replaceAll("//", "/");
  }
}
