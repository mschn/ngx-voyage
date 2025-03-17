import { Component, OnInit } from "@angular/core";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import typescript from "highlight.js/lib/languages/typescript";

@Component({
  selector: "app-quickstart",
  imports: [],
  template: `<div class="flex flex-col gap-3">
    <h1 class="text-4xl font-semibold">Quickstart</h1>

    <p>Install <code>ngx-voyage</code> with <code>npm</code>:</p>

    <pre><code class="language-bash rounded-md">npm install ngx-voyage</code></pre>

    <p>Use <code><![CDATA[<ngx-voyage>]]></code> in your app:</p>

    <pre><code class="language-typescript rounded-md"><![CDATA[import { File, NgxVoyageComponent } from "ngx-voyage";

@Component({
  selector: "app-root",
  imports: [NgxVoyageComponent],
  template: '<ngx-voyage [path]="path()" [files]="files()"></ngx-voyage>',
})
export class AppComponent {
  path = signal("/home/");
  files = signal<File[]>([]);
}
]]></code></pre>

    <p>
      <code>ngx-voyage</code> has peer dependencies on the following libraries:
    </p>
    <ul class="list-disc ml-5">
      <li>Angular <code>^19.2.0</code></li>
      <li>PrimeNG <code>^19.0.0</code></li>
    </ul>
  </div>`,
})
export class QuickstartComponent implements OnInit {
  ngOnInit(): void {
    hljs.registerLanguage("typescript", typescript);
    hljs.registerLanguage("bash", bash);
    hljs.highlightAll();
  }
}
