import { Component, computed, model } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import {
  FilePreviewOutput,
  NgxVoyageComponent,
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
  files = computed(() => filesMock[this.path()]);

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
}
