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

      <p>
        This guide will show you how to build a full Angular application with
        <code>ngx-voyage</code> from scratch.<br />
        we will build an Angular app that can browse the files of a remote
        computer where the server is running.
      </p>

      <img
        src="guide/2.png"
        class="w-fit mx-auto"
        alt="ngx-voyage with server files"
      />

      <div>
        <p>Table of contents:</p>
        <ul class="text-blue-500 ml-8">
          <li><a href="guide#bootstrap">1. Boostrap a new Angular app</a></li>
          <li><a href="guide#primeng">2. Install PrimeNG</a></li>
          <li><a href="guide#install">3. Install ngx-voyage</a></li>
          <li><a href="guide#server">4. Fetch files from a server</a></li>
          <li><a href="guide#preview">5. File preview from a server</a></li>
          <li><a href="guide#theme">6. Custom PrimeNG theme</a></li>
        </ul>
      </div>

      <a
        href="guide#bootstrap"
        id="bootstrap"
        class="text-2xl font-semibold mt-8"
      >
        1. Bootstrap a new Angular app
      </a>

      <p>
        First we will use the Angular CLI to create a new Angular application:
      </p>

      <pre><code class="language-bash rounded-md"><![CDATA[npm install -g @angular/cli
ng new ngx-voyage-demo
cd ngx-voyage-demo]]></code></pre>

      <p>
        This will create all the Angular boilerplate for a new app.<br />
        Edit <code>app.component.ts</code> to write the app code,<br />
        and use <code>npm run start</code> to test it.
      </p>
      <a href="guide#primeng" id="primeng" class="text-2xl font-semibold mt-8">
        2. Install PrimeNG
      </a>
      <p
        ><code>ngx-voyage</code> uses UI widgets from
        <a class="text-blue-500" href="https://primeng.org/" target="_blank"
          >PrimeNG</a
        >. We will need to install it as it's a peer dependency.</p
      >
      <p>
        You can check out
        <a
          href="https://primeng.org/installation"
          target="_blank"
          class="text-blue-500"
        >
          the official PrimeNG install guide</a
        >, but it basically boils down to first installing the dependency:
      </p>

      <pre><code class="language-bash rounded-md"><![CDATA[npm install primeng @primeng/themes]]></code></pre>

      <p>
        Then edit <code>app.config.ts</code> in order to setup the required
        <code>providers</code> and define the theme:
      </p>

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

      <p>
        Lastly we can add this in our global <code>style.css</code> file to make
        sure the components scales properly:
      </p>

      <pre><code class="language-css rounded-md"><![CDATA[html, body {
    height: 100%;
}]]></code></pre>

      <a href="guide#install" id="install" class="text-2xl font-semibold mt-8">
        3. Install ngx-voyage
      </a>

      <p>
        Now we can install <code>ngx-voyage</code> through npm.<br />
        We need <code>highlight.js</code> as peer dependency in order to do code
        highlighting when previewing files.
      </p>

      <pre><code class="language-bash rounded-md"><![CDATA[npm install ngx-voyage highlight.js]]></code></pre>

      <p>
        Now we simply need to use the component in
        <code>app.component.ts</code>:
      </p>

      <pre><code class="language-typescript rounded-md"><![CDATA[import { Component } from '@angular/core';
import { NgxVoyageComponent } from 'ngx-voyage';
@Component({
  selector: 'app-root',
  imports: [NgxVoyageComponent],
  template: \`<ngx-voyage path="/" [files]="[]"></ngx-voyage>\`,
})
export class AppComponent {}]]></code></pre>

      <ul class="list-disc ml-4">
        <li>
          The <code>path="/"</code> input tells <code>ngx-voyage</code> what is
          the folder path to show in the titlebar. </li
        ><li>
          The <code>[files]="[]"</code> input gives the list of files that are
          displayed in the current <code>path</code>
        </li></ul
      >
      <p>
        For this example these are empty, later on we'll see how to provide
        actual files there.<br />
        You can run the code with <code>npm run start</code> and see the result:
      </p>

      <img
        src="guide/1.png"
        class="w-fit mx-auto"
        alt="ngx-voyage basic integration screenshot"
      />

      <a href="guide#server" id="server" class="text-2xl font-semibold mt-8">
        4. Fetch files from a server
      </a>

      <p>
        In order to fetch some actual files to display in our file explorer, we
        need to setup a server.<br />
        For this example we will create a small <code>NodeJS</code> server that
        uses <code>Express</code>:
      </p>

      <pre><code class="language-bash rounded-md"><![CDATA[mkdir server; cd server
npm init
npm install express
]]></code></pre>

      <p>
        The server code will be located in <code>index.js</code>. It will
        contains a <code>GET /ls/:folder</code> endpoint that will return the
        list of files in that folder.
      </p>

      <pre><code class="language-typescript rounded-md"><![CDATA[const express = require('express');
const path = require('path');
const fs = require('fs')
const app = express();

// disable CORS checks, as both UI and server are running from a different location
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// list folder content
app.get('/ls/:folder', (req, res) => {
    const folderPath = decodeURIComponent(req.params.folder);
    const files = fs
        .readdirSync(folderPath) // list files in the folder
        .map((p) => {
            try {
                const filePath = path.join(folderPath, p);
                const stat = fs.statSync(filePath); // read file info
                // object structure expected by ngx-voyage inputs
                return {
                    isDirectory: stat.isDirectory(),
                    isFile: stat.isFile(),
                    name: p,
                    size: stat.size,
                    modifiedDate: stat.mtime,
                };
            } catch (e) {
                return undefined; // read permission error
            }
        }).filter((file) => file != undefined)
    res.send(files);
});

// start express server
app.listen(3003, () => console.log(\`server listening on port 3003\`));
]]></code></pre>

      <p>
        To start that server, simply run <code>node index.js</code> and express
        will be listening on port <code>3003</code>.
      </p>

      <p>
        Finally we can integrate our new API call in the Angular app using the
        <code>resource</code> function:
      </p>

      <pre><code class="language-typescript rounded-md"><![CDATA[import { Component, computed, model, resource } from '@angular/core';
import { File, NgxVoyageComponent } from 'ngx-voyage';
@Component({
  selector: 'app-root',
  imports: [NgxVoyageComponent],
  template: \`<ngx-voyage
    [(path)]="path"
    [files]="files()"
    [loading]="filesResource.isLoading()"
  ></ngx-voyage>\`,
})
export class AppComponent {
  filesResource = resource({
    request: () => ({ path: encodeURIComponent(this.path()) }),
    loader: async ({ request }) => {
      const response = await fetch('http://localhost:3003/ls/' + request.path);
      return (await response.json()) as File[];
    },
  });
  path = model('/');
  files = computed(() => this.filesResource.value() ?? []);
}
]]></code></pre>

      <ul class="ml-4 list-disc">
        <li>
          <code>[(path)]="path"</code> is a two-way bound model. This means we
          provide the initial path, and then when the user opens a folder inside
          the file explorer, the <code>path</code> will change in our app
          automatically.
        </li>
        <li>
          The resource request URL is derived from the
          <code>path()</code> signal. When the <code>path()</code> is updated,
          then the request changes and this causes the <code>resource</code> to
          be refetched automatically.
        </li>
        <li>
          <code>[files]="files()"</code> are <code>computed</code> from the
          resource value when it changes.
        </li>
        <li>
          <code>[loading]="filesResource.isLoading()"</code> passes the http
          resource loading state to ngx-voyage to display a loading indicator
          when a folder content is being fetched.
        </li>
      </ul>

      <img
        src="guide/2.png"
        class="w-fit mx-auto"
        alt="ngx-voyage with server files"
      />

      <a href="guide#preview" id="preview" class="text-2xl font-semibold mt-8">
        5. File preview from a server
      </a>

      <p>
        Last we will add the ability to preview files inside the explorer.<br />
        To do that we need to read the file content.
      </p>

      <pre><code class="language-typescript rounded-md"><![CDATA[const mime = require('mime-types');

app.get('/open/:file', async (req, res) => {
  const filePath = decodeURIComponent(req.params.file);
  const mimeType = mime.lookup(filePath);
  res.set('Content-Type', mimeType);
  const content = fs.readFileSync(filePath);
  res.send(content);
});
]]></code></pre>

      <pre><code class="language-typescript rounded-md"><![CDATA[import { Component, computed, model, resource } from '@angular/core';
import { File, FilePreviewOutput, NgxVoyageComponent } from 'ngx-voyage';
@Component({
  selector: 'app-root',
  imports: [NgxVoyageComponent],
  template: \`<ngx-voyage
    [(path)]="path"
    [files]="files()"
    [loading]="filesResource.isLoading()"
    (previewFile)="getFileContent($event)"
    (openFile)="openFile($event)"
  ></ngx-voyage>\`,
})
export class AppComponent {
  filesResource = resource({
    request: () => ({ path: encodeURIComponent(this.path()) }),
    loader: async ({ request }) => {
      const response = await fetch('http://localhost:3003/ls/' + request.path);
      return (await response.json()) as File[];
    },
  });
  path = model('/');
  files = computed(() => this.filesResource.value() ?? []);

  openFile(path: string) {
    const url = encodeURIComponent(path);
    window.open('http://localhost:3003/open/' + url, '_blank')?.focus();
  }

  getFileContent({ path, cb }: FilePreviewOutput) {
    const url = encodeURIComponent(path);
    fetch('http://localhost:3003/open/' + url).then(async (value) => {
      const blob = await value.blob();
      cb(blob);
    });
  }
}]]></code></pre>

      <img
        src="guide/3.png"
        class="w-fit mx-auto"
        alt="ngx-voyage file preview"
      />

      <a href="guide#theme" id="theme" class="text-2xl font-semibold mt-8">
        6. Custom PrimeNG theme
      </a>

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

      <p>
        One of the first things you will want to change is the primary color of
        the theme. You can apply a different one by registering a new theme
        preset:
      </p>

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
