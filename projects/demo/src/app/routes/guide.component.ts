import { Component, OnInit } from "@angular/core";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";

@Component({
  selector: "app-guide",
  templateUrl: "./guide.component.html",
})
export class GuideComponent implements OnInit {
  ngOnInit() {
    hljs.registerLanguage("typescript", typescript);
    hljs.registerLanguage("bash", bash);
    hljs.registerLanguage("css", css);
    hljs.highlightAll();
  }
}
