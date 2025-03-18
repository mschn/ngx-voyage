import { Component, OnInit } from "@angular/core";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";

@Component({
  selector: "app-guide",
  template: `
    <div class="flex flex-col gap-3">
      <h1 class="text-4xl font-semibold">Howto Guide</h1>

      <ul class="text-blue-500 ml-8">
        <li><a href="guide#bootstrap">1. Boostrap a new Angular app</a></li>
        <li><a href="guide#primeng">2. Install PrimeNG</a></li>
        <li><a href="guide#install">3. Install ngx-voyage</a></li>
        <li><a href="guide#server">4. Fetch files from a server</a></li>
        <li><a href="guide#theme">5. Custom PrimeNG theme</a></li>
      </ul>

      <a href="guide#bootstrap" id="bootstrap" class="text-2xl font-semibold"
        >1. Bootstrap a new Angular app</a
      >

      <pre><code class="language-bash rounded-md"><![CDATA[npm install -g @angular/cli
ng new ngx-voyage-demo
cd ngx-voyage-demo]]></code></pre>

      <a href="guide#primeng" id="primeng" class="text-2xl font-semibold"
        >2. Install PrimeNG</a
      >

      <p
        >You can check out
        <a
          href="https://primeng.org/installation"
          target="_blank"
          class="text-blue-500"
          >the official PrimeNG install guide</a
        >, but it basically boils down to:</p
      >

      <pre><code class="language-bash rounded-md"><![CDATA[npm install primeng @primeng/themes]]></code></pre>

      <pre><code class="language-typescript rounded-md"><![CDATA[import { ApplicationConfig } from '@angular/core';
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
};]]></code></pre>

      <pre><code class="language-css rounded-md"><![CDATA[html, body {
    height: 100%;
}]]></code></pre>

      <a href="guide#install" id="install" class="text-2xl font-semibold"
        >3. Install ngx-voyage</a
      >

      <pre><code class="language-bash rounded-md"><![CDATA[npm install ngx-voyage highlight.js]]></code></pre>

      <pre><code class="language-typescript rounded-md"><![CDATA[import { Component } from '@angular/core';
import { NgxVoyageComponent } from 'ngx-voyage';
@Component({
  selector: 'app-root',
  imports: [NgxVoyageComponent],
  template: \`<ngx-voyage path="/" [files]="[]"></ngx-voyage>\`,
})
export class AppComponent {}]]></code></pre>

      <img src="guide/1.png" alt="ngx-voyage basic integration screenshot" />

      <a href="guide#server" id="server" class="text-2xl font-semibold"
        >4. Fetch files from a server</a
      >

      <pre><code class="language-bash rounded-md"><![CDATA[mkdir server; cd server
npm init
npm install express
]]></code></pre>

      <a href="guide#theme" id="theme" class="text-2xl font-semibold"
        >5. Custom PrimeNG theme</a
      >

      <p>
        You can customize the look and feel using PrimeNG themes. <br />
        Check out the full PrimeNG guide for all theming options:
        <a
          href="https://primeng.org/theming"
          target="_blank"
          class="text-blue-500"
          >https://primeng.org/theming</a
        >
      </p>

      <p
        >One of the first things you will want to change is the primary color of
        the theme. You can apply a different one by registering a new theme
        preset:</p
      >

      <pre><code class="language-typescript rounded-md"><![CDATA[export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: definePreset(Aura, {
          semantic: {
            primary: {
              50: '{indigo.50}',
              100: '{indigo.100}',
              200: '{indigo.200}',
              300: '{indigo.300}',
              400: '{indigo.400}',
              500: '{indigo.500}',
              600: '{indigo.600}',
              700: '{indigo.700}',
              800: '{indigo.800}',
              900: '{indigo.900}',
              950: '{indigo.950}',
            },
          },
        }),
      },
    }),
  ],
};]]></code></pre>
    </div>
  `,
})
export class GuideComponent implements OnInit {
  ngOnInit() {
    hljs.registerLanguage("typescript", typescript);
    hljs.registerLanguage("bash", bash);
    hljs.registerLanguage("css", css);
    hljs.highlightAll();
  }
}
