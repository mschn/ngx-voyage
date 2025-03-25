import { Component, model, OnInit } from "@angular/core";
import hljs from "highlight.js/lib/core";
import html from "highlight.js/lib/languages/xml";
import typescript from "highlight.js/lib/languages/typescript";

import { NgxVoyageComponent } from "../../../../ngx-voyage/src/public-api";

@Component({
  selector: "app-features",
  imports: [NgxVoyageComponent],
  templateUrl: "./features.component.html",
})
export class FeaturesComponent implements OnInit {
  path = model("/path/to/nested/folder");

  ngOnInit(): void {
    hljs.registerLanguage("html", html);
    hljs.registerLanguage("typescript", typescript);
    hljs.highlightAll();
  }
}
