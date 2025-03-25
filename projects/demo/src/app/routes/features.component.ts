import { Component, OnInit } from "@angular/core";
import hljs from "highlight.js/lib/core";
import html from "highlight.js/lib/languages/xml";
import { NgxVoyageComponent } from "../../../../ngx-voyage/src/public-api";

@Component({
  selector: "app-features",
  imports: [NgxVoyageComponent],
  templateUrl: "./features.component.html",
})
export class FeaturesComponent implements OnInit {
  ngOnInit(): void {
    hljs.registerLanguage("html", html);

    hljs.highlightAll();
  }
}
