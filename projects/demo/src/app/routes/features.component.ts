import { Component, OnInit } from "@angular/core";
import hljs from "highlight.js/lib/core";
import html from "highlight.js/lib/languages/xml";
import { NgxVoyageComponent } from "../../../../ngx-voyage/src/public-api";

@Component({
  selector: "app-features",
  imports: [NgxVoyageComponent],
  template: `
    <div class="flex flex-col gap-3">
      <h1 class="text-4xl font-semibold">Features</h1>

      <a
        href="features#empty"
        id="empty"
        class="text-2xl font-semibold block mt-8  "
      >
        Empty state
      </a>
      <div class=" w-[40rem] ">
        <div class=" h-[20rem]">
          <ngx-voyage path="/" [files]="[]"></ngx-voyage
        ></div>
        <pre><code class="language-html "
        ><![CDATA[<ngx-voyage path="/" [files]="[]"></ngx-voyage>]]></code></pre>
      </div>

      <a
        href="features#loading"
        id="loading"
        class="text-2xl font-semibold block mt-8  "
      >
        Loading
      </a>
      <div class=" w-[40rem] ">
        <div class=" h-[20rem]">
          <ngx-voyage path="/" [files]="[]" [loading]="true"></ngx-voyage
        ></div>
        <pre><code class="language-html "
        ><![CDATA[<ngx-voyage path="/" [files]="[]" [loading]="true"></ngx-voyage>]]></code></pre>
      </div>

      <a
        href="features#message"
        id="message"
        class="text-2xl font-semibold block mt-8  "
      >
        Messages
      </a>
      <div class=" w-[40rem] ">
        <div class=" h-[20rem]">
          <ngx-voyage
            path="/"
            [files]="[]"
            [message]="{ text: 'Watch out', type: 'warn' }"
          ></ngx-voyage
        ></div>
        <pre><code class="language-html "
        ><![CDATA[<ngx-voyage
    path="/"
    [files]="[]"
    [message]="{ text: 'Watch out', type: 'warn' }"
  ></ngx-voyage>]]></code></pre>
      </div>
    </div>
  `,
})
export class FeaturesComponent implements OnInit {
  ngOnInit(): void {
    hljs.registerLanguage("html", html);

    hljs.highlightAll();
  }
}
