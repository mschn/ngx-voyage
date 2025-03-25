import { Component, inject, input, model, output } from "@angular/core";
import { ProgressBarModule } from "primeng/progressbar";
import { MessageComponent } from "../message/message.component";
import { Message } from "../model/message";
import { File, FilePreviewOutput } from "../model/model";
import { Store } from "../model/store";
import { GridViewComponent } from "./grid/grid-view.component";
import { ListViewComponent } from "./list/list-view.component";
import { NgTemplateOutlet } from "@angular/common";
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
      ></ngx-voyage-grid-view>
    } @else {
      <ngx-voyage-list-view
        [path]="path()"
        [files]="files()"
        (openFile)="openFile.emit($event)"
        (previewFile)="previewFile.emit($event)"
      >
        <ng-template #emptyFiles>
          <ng-container *ngTemplateOutlet="empty"></ng-container>
        </ng-template>
      </ngx-voyage-list-view>
    }

    <ng-template #empty>
      @if (message()) {
        <div class="p-2">
          <ngx-voyage-message [message]="message()"></ngx-voyage-message>
        </div>
      } @else if (loading()) {
        <div class="p-2">
          <p-progressbar mode="indeterminate" styleClass="!h-2" />
        </div>
      } @else if (isEmpty()) {
        <div class="p-2">
          <ngx-voyage-message
            [message]="{ text: 'This folder is empty', type: 'info' }"
          ></ngx-voyage-message>
        </div>
      }
    </ng-template>
  `,
  imports: [
    GridViewComponent,
    ListViewComponent,
    MessageComponent,
    ProgressBarModule,
    NgTemplateOutlet,
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

  isEmpty() {
    return this.files() == null || this.files().length === 0;
  }
}
