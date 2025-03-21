import {
  Component,
  computed,
  inject,
  input,
  model,
  OnChanges,
  output,
  signal,
  SimpleChanges,
  viewChild,
} from "@angular/core";
import { MenuItem } from "primeng/api";
import { ContextMenu } from "primeng/contextmenu";
import { canPreviewFile, getFileIcon } from "../model/file-types";
import { Message } from "../model/message";
import { File, FilePreviewOutput } from "../model/model";
import { Store } from "../model/store";
@Component({
  template: ``,
})
export abstract class BaseViewComponent implements OnChanges {
  store = inject(Store);

  path = input.required<string>();
  files = input.required<File[]>();
  message = input<Message>();
  loading = input<boolean>(false);

  openFolder = output<string>();
  openFile = output<string>();
  previewFile = output<FilePreviewOutput>();

  selectedFile = model<File | undefined>(undefined);
  showPreview = model(false);
  previewData = signal<Blob | undefined>(undefined);

  contextMenu = viewChild<ContextMenu>("contextMenu");
  getFileIcon = getFileIcon;

  filteredFiles = computed(() => {
    if (this.store.showHiddenFiles()) {
      return this.files();
    } else {
      return this.files().filter(({ name }) => !name.startsWith("."));
    }
  });

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
      this.menuItems[1].visible = this.store.showOpenFile() || file.isDirectory;
      cm.target = event.currentTarget as HTMLElement;
      cm.show(event);
    }
  }

  getTargetPath(file: File) {
    return `${this.path()}/${file.name}`.replaceAll("//", "/");
  }

  isSelectedFile(file: File) {
    return this.selectedFile() === file;
  }
}
