import { File } from "../../../../ngx-voyage/src/public-api";

export const filesMock: Record<string, File[]> = {
  "/": [
    {
      isFile: false,
      isDirectory: true,
      isSymbolicLink: false,
      modifiedDate: new Date(),
      name: "home",
      size: 72,
    },
  ],
  "/home": [
    {
      isFile: false,
      isDirectory: true,
      isSymbolicLink: false,
      modifiedDate: new Date(),
      name: "voyage",
      size: 43,
    },
  ],
  "/home/voyage": [
    {
      isFile: false,
      isDirectory: true,
      isSymbolicLink: false,
      modifiedDate: new Date(Date.now()),
      name: "screenshots",
      size: 24,
    },
    {
      isFile: true,
      isDirectory: false,
      isSymbolicLink: false,
      modifiedDate: new Date(),
      name: ".secrets.txt",
      size: 64,
    },
    {
      isFile: true,
      isDirectory: false,
      isSymbolicLink: false,
      modifiedDate: new Date(Date.now() - 86400000),
      name: "example.component.ts",
      size: 2048,
    },
    {
      isFile: true,
      isDirectory: false,
      isSymbolicLink: false,
      modifiedDate: new Date(Date.now() - 86400000 * 2),
      name: "README.md",
      size: 626,
    },
    {
      isFile: true,
      isDirectory: false,
      isSymbolicLink: false,
      modifiedDate: new Date(),
      name: "LICENSE.md",
      size: 1068,
    },
  ],
  "/home/voyage/screenshots": [
    {
      isFile: true,
      isDirectory: false,
      isSymbolicLink: false,
      modifiedDate: new Date(),
      name: "light.png",
      size: 139075,
    },
    {
      isFile: true,
      isDirectory: false,
      isSymbolicLink: false,
      modifiedDate: new Date(),
      name: "dark.png",
      size: 122454,
    },
  ],
};

export const filesContentMock: Record<string, string> = {
  "/home/voyage/.secrets.txt": `
[secrets]
password1 = very-secret-1234
password2 = ( ͡° ͜ʖ ͡°)
  `,
  "/home/voyage/example.component.ts": `
import { File, NgxVoyageComponent } from "ngx-voyage";

@Component({
  selector: "app-root",
  imports: [NgxVoyageComponent],
  template: '<ngx-voyage [path]="path()" [files]="files()"></ngx-voyage>',
})
export class AppComponent {
  path = signal("/home/");
  files = signal<File[]>([]);
}
  `,
  "/home/voyage/README.md": `
# ngx-voyage

ngx-voyage is an Angular File Explorer component built with PrimeNG.

## Quickstart

Install \`ngx-voyage\` with \`npm\`:

\`\`\`bash
npm install ngx-voyage
\`\`\`

Use \`<ngx-voyage>\` in your app:

\`\`\`ts
import { File, NgxVoyageComponent } from "ngx-voyage";

@Component({
  selector: "app-root",
  imports: [NgxVoyageComponent],
  template: '<ngx-voyage [path]="path()" [files]="files()"></ngx-voyage>',
})
export class AppComponent {
  path = signal("/home/");
  files = signal<File[]>([]);
}
\`\`\`

## Built with

- [Angular](https://angular.dev/)
- [Tailwind](https://tailwindcss.com/)
- [Primeng](https://primeng.org/)

  `,
  "/home/voyage/LICENSE.md": `
MIT License

Copyright 2025 Mathieu Schnoor

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  `,
};
