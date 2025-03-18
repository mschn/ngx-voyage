import { CommonModule, NgTemplateOutlet } from "@angular/common";
import {
  Component,
  contentChild,
  inject,
  input,
  model,
  OnInit,
  output,
  TemplateRef,
  ViewEncapsulation,
} from "@angular/core";
import { ProgressBarModule } from "primeng/progressbar";
import { BookmarksComponent } from "../bookmarks/bookmarks.component";
import { getMessages } from "../i18n/i18n";
import { ListComponent } from "../list/list.component";
import { Message } from "../model/message";
import { File, FilePreviewOutput, normalizeFile } from "../model/model";
import { Store } from "../model/store";
import { TitleComponent } from "../title/title.component";

@Component({
  selector: "ngx-voyage",
  imports: [
    TitleComponent,
    ListComponent,
    ProgressBarModule,
    BookmarksComponent,
    NgTemplateOutlet,
    CommonModule,
  ],
  templateUrl: "./ngx-voyage.component.html",
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "flex flex-col h-full overflow-hidden",
  },
  styleUrls: ["ngx-voyage.component.css"],
})
export class NgxVoyageComponent implements OnInit {
  #store = inject(Store);

  /**
   * current folder path to display in the title bar
   * example: '/home/bob/'
   */
  path = model.required<string>();

  /**
   * list if files contained in the current folder
   */
  files = input.required<File[], File[]>({
    transform: (files) => files.map((f) => normalizeFile(f)),
  });

  /**
   * Style classes to append to the top DOM element
   */
  styleClass = input("");

  /**
   * An error message to display instead of the file listing
   * example: a network or permission error prevents displaying files
   */
  message = input<Message>();

  /**
   * true to display a loading indicator while files are loading
   */
  loading = input<boolean>(false);

  /**
   * Fired when the user requests to open this file.
   * When this happens you should open the file with an external program,
   * ie a PDF viewer or a text editor, or a new browser tab.
   */
  openFile = output<string>();

  /**
   * Fired when the user requests to preview the content of a file.
   * This provides a `FilePreviewOutput` as `$event`,
   * allowing you to provide the file content in a callback. Example:
   *```
   *  preview({ path, cb }: FilePreviewOutput) {
   *    const blob = new Blob(['Hello world'], {
   *      type: "text/plain",
   *    });
   *    cb(blob);
   *  }
   *```
   * Preview the content of a file
   */
  previewFile = output<FilePreviewOutput>();

  header = contentChild<TemplateRef<Element>>("header");
  footer = contentChild<TemplateRef<Element>>("footer");

  ngOnInit() {
    const hasOpenFileOutput = this.openFile["listeners"]?.length > 0;
    this.#store.showOpenFile.set(hasOpenFileOutput);

    if (this.#store.bookmarks().length === 0) {
      this.#store.addBookmark({
        icon: "home",
        name: getMessages().HOME,
        path: this.path(),
      });
    }
  }

  onOpenFolder(folderPath: string) {
    this.path.set(folderPath);
  }
}
