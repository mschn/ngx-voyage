import { NgTemplateOutlet } from "@angular/common";
import {
  Component,
  ElementRef,
  inject,
  input,
  model,
  output,
  viewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { ProgressBarModule } from "primeng/progressbar";
import { MessageComponent } from "../message/message.component";
import { Message } from "../model/message";
import { File, FilePreviewOutput, RenameFile } from "../model/model";
import { Store } from "../model/store";
import { GridViewComponent } from "./grid/grid-view.component";
import { ListViewComponent } from "./list/list-view.component";
import { TranslatePipe } from "../i18n/translate.pipe";

@Component({
  selector: "ngx-voyage-files-view",
  template: `
    @if (store.selectedView() === "grid") {
      <ng-container *ngTemplateOutlet="empty"></ng-container>
      <ngx-voyage-grid-view
        [(path)]="path"
        [files]="files()"
        (openFile)="openFile.emit($event)"
        (previewFile)="previewFile.emit($event)"
        (renameFile)="onRenameFile()"
        (deleteFile)="onDeleteFile()"
      ></ngx-voyage-grid-view>
    } @else {
      <ngx-voyage-list-view
        [(path)]="path"
        [files]="files()"
        (openFile)="openFile.emit($event)"
        (previewFile)="previewFile.emit($event)"
        (renameFile)="onRenameFile()"
        (deleteFile)="onDeleteFile()"
      >
        <ng-template #emptyFiles>
          <ng-container *ngTemplateOutlet="empty"></ng-container>
        </ng-template>
      </ngx-voyage-list-view>
    }

    <ng-template #empty>
      @if (message()) {
        <div class="message-wrapper">
          <ngx-voyage-message [message]="message()"></ngx-voyage-message>
        </div>
      } @else if (loading()) {
        <div class="message-wrapper">
          <p-progressbar mode="indeterminate" styleClass="!h-2" />
        </div>
      } @else if (isEmpty()) {
        <div class="message-wrapper">
          <ngx-voyage-message
            [message]="{ text: 'This folder is empty', type: 'info' }"
          ></ngx-voyage-message>
        </div>
      }
    </ng-template>

    <p-dialog
      [modal]="true"
      [header]="'RENAME' | translate"
      [(visible)]="showRenameModal"
      (onShow)="focusRenameInput()"
    >
      <div class="flex">
        <input
          type="text"
          pInputText
          [(ngModel)]="renameFileName"
          #renameFileInput
          data-testid="rename-file-input"
        />
        <p-button
          (onClick)="doRename()"
          [disabled]="renameFileName().length === 0"
          data-testid="rename-button"
          >{{ "RENAME" | translate }}</p-button
        >
      </div>
    </p-dialog>

    <p-dialog [modal]="true" header="Delete" [(visible)]="showDeleteModal">
      <div class="flex flex-col">
        <div>
          {{ "DELETE_CONFIRM" | translate }} {{ store.selectedFile()?.name }} ?
        </div>
        <div class="flex justify-end">
          <p-button
            (onClick)="showDeleteModal.set(false)"
            severity="secondary"
            >{{ "CANCEL" | translate }}</p-button
          >
          <p-button
            (onClick)="doDelete()"
            severity="danger"
            data-testid="delete-button"
            >{{ "DELETE" | translate }}</p-button
          >
        </div>
      </div>
    </p-dialog>
  `,
  styles: `
    .message-wrapper {
      padding: 0.5rem;
    }

    .flex {
      display: flex;
      gap: 1rem;
    }

    .flex-col {
      flex-direction: column;
    }

    .justify-end {
      justify-content: end;
    }
  `,
  imports: [
    GridViewComponent,
    ListViewComponent,
    MessageComponent,
    ProgressBarModule,
    NgTemplateOutlet,
    DialogModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    TranslatePipe,
  ],
})
export class FilesViewComponent {
  store = inject(Store);

  path = model.required<string>();
  files = input.required<File[]>();
  message = input<Message>();
  loading = input<boolean>(false);
  openFile = output<string>();
  previewFile = output<FilePreviewOutput>();
  renameFile = output<RenameFile>();
  deleteFile = output<File>();

  showRenameModal = model(false);
  renameFileName = model("");
  renameFileInput = viewChild<ElementRef<HTMLInputElement>>("renameFileInput");

  showDeleteModal = model(false);

  isEmpty() {
    return this.files() == null || this.files().length === 0;
  }

  onRenameFile() {
    const selected = this.store.selectedFile();
    if (selected != null) {
      this.renameFileName.set(selected.name);
      this.showRenameModal.set(true);
    }
  }

  onDeleteFile() {
    const selected = this.store.selectedFile();
    if (selected != null) {
      this.showDeleteModal.set(true);
    }
  }

  focusRenameInput() {
    const selected = this.store.selectedFile();
    if (selected && selected.isFile) {
      this.renameFileInput()?.nativeElement.focus();
      this.renameFileInput()?.nativeElement.setSelectionRange(
        0,
        selected.name.lastIndexOf("."),
      );
    }
  }

  doRename() {
    const selected = this.store.selectedFile();
    if (selected && this.renameFileName().length > 0) {
      this.renameFile.emit({ file: selected, newName: this.renameFileName() });
      this.showRenameModal.set(false);
    }
  }

  doDelete() {
    const selected = this.store.selectedFile();
    if (selected != null) {
      this.deleteFile.emit(selected);
      this.showDeleteModal.set(false);
    }
  }
}
