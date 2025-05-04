import { Component, linkedSignal, model } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import {
  File,
  FilePreviewOutput,
  NgxVoyageComponent,
  RenameFile,
  VoyageIconComponent,
} from "../../../../../ngx-voyage/src/public-api";
import { filesContentMock, filesMock } from "../../mocks/files.mock";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  imports: [NgxVoyageComponent, ButtonModule, RouterLink, VoyageIconComponent],
})
export class HomeComponent {
  path = model("/home/ngx-voyage");
  files = linkedSignal(() => filesMock[this.path()]);

  preview({ path, cb }: FilePreviewOutput) {
    if (path.endsWith("light.png")) {
      fetch("light.png").then((response) =>
        response.blob().then((blob) => cb(blob)),
      );
    } else if (path.endsWith("dark.png")) {
      fetch("dark.png").then((response) =>
        response.blob().then((blob) => cb(blob)),
      );
    } else {
      const blob = new Blob([filesContentMock[path]], {
        type: "text/plain",
      });
      cb(blob);
    }
  }

  rename(renameFile: RenameFile) {
    const file = filesMock[this.path()].find(
      (file) => file.name === renameFile.file.name,
    );
    if (file) {
      const oldFilePath = `${this.path()}/${file.name}`;
      const newFilePath = `${this.path()}/${renameFile.newName}`;
      file.name = renameFile.newName;
      this.files.set([...filesMock[this.path()]]);
      filesContentMock[newFilePath] = filesContentMock[oldFilePath];
    }
  }

  deleteFile(f: File) {
    const filteredFilesMock = filesMock[this.path()].filter(
      (file) => file.name !== f.name,
    );
    filesMock[this.path()] = filteredFilesMock;
    this.files.set(filesMock[this.path()]);
  }
}
