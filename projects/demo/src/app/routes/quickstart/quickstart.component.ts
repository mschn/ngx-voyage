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

    <p>
      <code>ngx-voyage</code> has peer dependencies on the following libraries,
      that will need to be installed as well:
    </p>
    <ul class="list-disc ml-5">
      <li
        ><a class="text-blue-500" href="https://angular.dev/" target="_blank">
          Angular
        </a>
        version <code>^19.2.0</code></li
      >
      <li
        ><a class="text-blue-500" href="https://primeng.org/" target="_blank">
          PrimeNG
        </a>
        version <code>^19.0.0</code>, used as UI widget toolkit</li
      >
      <li
        ><a
          class="text-blue-500"
          href="https://highlightjs.org/"
          target="_blank"
        >
          highlight.js
        </a>
        version <code>^11.11.1</code>, used to syntax highlight code files</li
      >
    </ul>

    <p>Then you can use <code><![CDATA[<ngx-voyage>]]></code> in your app:</p>

    <pre><code class="language-typescript rounded-md"><![CDATA[import { NgxVoyageComponent, File } from "ngx-voyage";

@Component({
  selector: "app-root",
  imports: [NgxVoyageComponent],
  template: '<ngx-voyage path="/home" [files]="files"></ngx-voyage>',
})
export class AppComponent {
  files: File[] = [{
    isDirectory: true,
    isFile: false,
    name: 'ngx-voyage',
    size: 1,
    modifiedDate: new Date(),
  }]
}
]]></code></pre>

    <p>
      <a class="text-blue-500 text-xl" href="guide">
        Check out the full Howto Guide to get more detailed information!
      </a></p
    >
  </div>`,
})
export class QuickstartComponent implements OnInit {
  ngOnInit(): void {
    hljs.registerLanguage("typescript", typescript);
    hljs.registerLanguage("bash", bash);
    hljs.highlightAll();
  }
}
