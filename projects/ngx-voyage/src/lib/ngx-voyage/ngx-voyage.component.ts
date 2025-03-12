import {
  Component,
  EventEmitter,
  inject,
  input,
  model,
  OnInit,
  Output,
  output,
  ViewEncapsulation,
} from "@angular/core";
import { ProgressBarModule } from "primeng/progressbar";
import { ListComponent } from "../list/list.component";
import { Message } from "../model/message";
import { addType, File, FilePreviewOutput } from "../model/model";
import { TitleComponent } from "../title/title.component";
import { Store } from "../model/store";

@Component({
  selector: "ngx-voyage",
  imports: [TitleComponent, ListComponent, ProgressBarModule],
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
    transform: (files) => {
      files.forEach((f) => addType(f));
      return files;
    },
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
   * can be removed in favor of (onPath) model
   * @deprecated
   */
  openFolder = output<string>();

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

  ngOnInit() {
    const hasOpenFileOutput = this.openFile["listeners"]?.length > 0;
    this.#store.setShowOpenFile(hasOpenFileOutput);
  }

  onOpenFolder(folderPath: string) {
    this.path.set(folderPath);
    this.openFolder.emit(folderPath);
  }
}
