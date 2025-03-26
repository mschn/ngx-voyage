import { Component, model, OnInit } from "@angular/core";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

import { NgxVoyageComponent } from "../../../../../ngx-voyage/src/public-api";
import { SideNavComponent, SideNavLink } from "../sidenav.component";

@Component({
  selector: "app-features",
  imports: [NgxVoyageComponent, SideNavComponent],
  templateUrl: "./features.component.html",
})
export class FeaturesComponent implements OnInit {
  path = model("/path/to/nested/folder");

  sideNavLinks: SideNavLink[] = [
    {
      href: "features#folders",
      text: "Folder navigation",
    },
    {
      href: "features#loading",
      text: "Loading",
    },
    {
      href: "features#messages",
      text: "Messages",
    },
    {
      href: "features#templates",
      text: "Header & footer templates",
    },
  ];

  ngOnInit(): void {
    hljs.registerLanguage("html", html);
    hljs.registerLanguage("typescript", typescript);
    hljs.highlightAll();
  }
}
