import { Component, computed, model, signal } from "@angular/core";
import {
  FilePreviewOutput,
  NgxVoyageComponent,
} from "../../../../../dist/ngx-voyage";
import { ButtonModule } from "primeng/button";
import { RouterLink } from "@angular/router";
import { filesContentMock, filesMock } from "../mocks/files.mock";

@Component({
  selector: "app-home",
  template: `
    <div class=" max-w-[50rem] mx-auto flex flex-col gap-10  ">
      <div class="text-center flex flex-col gap-3 ">
        <h1 class="text-4xl font-semibold">ngx-voyage</h1>
        <h2 class="text-2xl">
          File Explorer Component for
          <a
            class="text-blue-600 dark:text-blue-300"
            href="https://angular.dev/"
            target="_blank"
            rel="noopener noreferrer"
            >Angular</a
          >
          and
          <a
            class="text-blue-600 dark:text-blue-300"
            href="https://primeng.org/"
            target="_blank"
            rel="noopener noreferrer"
            >PrimeNG</a
          >
        </h2>
        <div class="flex gap-5 mx-auto">
          <p-button routerLink="/quickstart"
            ><i class="fa-solid fa-arrow-right text-xl"></i> Get
            started</p-button
          >
          <a
            href="https://github.com/mschn/ngx-voyage"
            target="_blank"
            rel="noopener noreferrer"
            class="p-button p-button-outlined bg-white! border-blue-400!"
          >
            <i class="fa-brands fa-github text-xl"></i>
            Github
          </a>
        </div>
      </div>
      <div class="h-[30rem]">
        <ngx-voyage
          [(path)]="path"
          [files]="files()"
          (previewFile)="preview($event)"
          class="border border-gray-400 dark:border-gray-500 rounded-lg shadow-2xl"
        >
        </ngx-voyage>
      </div>
    </div>
  `,
  imports: [NgxVoyageComponent, ButtonModule, RouterLink],
})
export class HomeComponent {
  path = model("/home/voyage");
  files = computed(() => filesMock[this.path()]);

  preview({ path, cb }: FilePreviewOutput) {
    if (path.endsWith("light.png")) {
      fetch("light.png").then((response) =>
        response.blob().then((blob) => cb(blob))
      );
    } else if (path.endsWith("dark.png")) {
      fetch("dark.png").then((response) =>
        response.blob().then((blob) => cb(blob))
      );
    } else {
      const blob = new Blob([filesContentMock[path]], {
        type: "text/plain",
      });
      cb(blob);
    }
  }
}
