# ngx-voyage

[![npmjs](https://img.shields.io/npm/v/ngx-voyage?color=blue)](https://www.npmjs.com/package/ngx-voyage)
[![E2E tests](https://github.com/mschn/ngx-voyage/actions/workflows/e2e_tests.yml/badge.svg)](https://github.com/mschn/ngx-voyage/actions/workflows/e2e_tests.yml)
[![Unit tests](https://github.com/mschn/ngx-voyage/actions/workflows/unit_tests.yml/badge.svg)](https://github.com/mschn/ngx-voyage/actions/workflows/unit_tests.yml)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=mschn_ngx-voyage&metric=coverage)](https://sonarcloud.io/summary/new_code?id=mschn_ngx-voyage)

`ngx-voyage` is a File Explorer component for [Angular](https://angular.dev/) and [PrimeNG](https://primeng.org/).\
Demo and docs: https://mschn.github.io/ngx-voyage/

<p align="center">
  <img src="https://raw.githubusercontent.com/mschn/ngx-voyage/refs/heads/main/projects/demo/public/readme.png" />
</p>

## Quickstart

Install `ngx-voyage` with `npm`:

```bash
npm install ngx-voyage
```

Use `<ngx-voyage>` in your app:

```ts
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
```

## Built with

- [Angular](https://angular.dev/)
- [PrimeNG](https://primeng.org/)
- [Tailwind](https://tailwindcss.com/)
