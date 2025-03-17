# Guide

## Bootstrap a new Angular app

```bash
npm install -g @angular/cli
ng new ngx-voyage-demo
cd ngx-voyage-demo
```

## Install PrimeNG

```bash
npm install primeng @primeng/themes
```

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        })
    ]
};
```

## Install ngx-voyage

```bash
npm install ngx-voyage highlight.js
```

```typescript
import { Component } from '@angular/core';
import { NgxVoyageComponent } from 'ngx-voyage';
@Component({
  selector: 'app-root',
  imports: [NgxVoyageComponent],
  template: `<ngx-voyage path="/" [files]="[]"></ngx-voyage>`,
})
export class AppComponent {}
```