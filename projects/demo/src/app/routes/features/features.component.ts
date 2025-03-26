import { Component, model, OnInit } from "@angular/core";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

import {
  NgxVoyageComponent,
  File,
  FilePreviewOutput,
} from "../../../../../ngx-voyage/src/public-api";
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
      href: "features#files",
      text: "Files & folders",
    },
    {
      href: "features#folders",
      text: "Folder navigation",
    },
    {
      href: "features#previewfile",
      text: "Preview a file",
    },
    {
      href: "features#openfile",
      text: "Open a file",
    },
    {
      href: "features#loading",
      text: "Loading",
    },
    {
      href: "features#message",
      text: "Messages",
    },
    {
      href: "features#templates",
      text: "Header & footer templates",
    },
  ];

  filesExample: File[] = [
    {
      isDirectory: false,
      isFile: true,
      isSymbolicLink: false,
      modifiedDate: new Date(),
      name: "file.txt",
      size: 1024,
    },
    {
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false,
      modifiedDate: new Date(),
      name: "folder",
      size: 1,
    },
  ];

  file: File = {
    isDirectory: false,
    isFile: true,
    isSymbolicLink: false,
    modifiedDate: new Date(),
    name: "file.txt",
    size: 1024,
  };

  ngOnInit(): void {
    hljs.registerLanguage("html", html);
    hljs.registerLanguage("typescript", typescript);
    hljs.highlightAll();
  }

  openFile(path: string) {
    alert(`Opening file ${path}`);
  }

  previewFile(preview: FilePreviewOutput) {
    preview.cb(new Blob([`File content: ${preview.path}`]));
  }
}
