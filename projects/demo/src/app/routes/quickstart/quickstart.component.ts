import { Component, OnInit } from "@angular/core";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import typescript from "highlight.js/lib/languages/typescript";

@Component({
  selector: "app-quickstart",
  imports: [],
  templateUrl: "./quickstart.component.html",
})
export class QuickstartComponent implements OnInit {
  ngOnInit(): void {
    hljs.registerLanguage("typescript", typescript);
    hljs.registerLanguage("bash", bash);
    hljs.highlightAll();
  }
}
