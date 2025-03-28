import { AfterViewInit, Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import typescript from "highlight.js/lib/languages/typescript";
import { SideNavComponent } from "../sidenav.component";

@Component({
  selector: "app-guide",
  templateUrl: "./guide.component.html",
  imports: [SideNavComponent],
})
export class GuideComponent implements OnInit, AfterViewInit {
  route = inject(ActivatedRoute);

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
  ];

  ngOnInit() {
    hljs.registerLanguage("typescript", typescript);
    hljs.registerLanguage("bash", bash);
    hljs.registerLanguage("css", css);
    hljs.highlightAll();
  }

  ngAfterViewInit(): void {
    const elt = document.querySelector("#" + this.route.snapshot.fragment);
    if (elt) {
      elt.scrollIntoView();
    } else {
      document.querySelector("#scroll-container")?.scrollTo(0, 0);
    }
  }
}
