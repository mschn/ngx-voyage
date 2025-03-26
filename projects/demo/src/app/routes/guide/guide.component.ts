import { Component, OnInit } from "@angular/core";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import { SideNavComponent } from "../sidenav.component";

@Component({
  selector: "app-guide",
  templateUrl: "./guide.component.html",
  imports: [SideNavComponent],
})
export class GuideComponent implements OnInit {
  sideNavLinks = [
    {
      href: "guide#howto",
      id: "howto",
      text: "Howto guide",
    },
    {
      href: "guide#bootstrap",
      id: "bootstrap",
      text: "1. Boostrap a new Angular app",
    },
    { href: "guide#primeng", id: "primeng", text: "2. Install PrimeNG" },
    { href: "guide#install", id: "install", text: "3. Install ngx-voyage" },
    {
      href: "guide#server",
      id: "server",
      text: "4. Fetch files from a server",
    },
    {
      href: "guide#preview",
      id: "preview",
      text: "5. File preview from a server",
    },
    { href: "guide#theme", id: "theme", text: "6. Custom PrimeNG theme" },
  ];

  ngOnInit() {
    hljs.registerLanguage("typescript", typescript);
    hljs.registerLanguage("bash", bash);
    hljs.registerLanguage("css", css);
    hljs.highlightAll();
  }
}
