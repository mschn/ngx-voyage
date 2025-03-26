import { Component, input } from "@angular/core";

export interface SideNavLink {
  href: string;
  text: string;
}

@Component({
  selector: "app-sidenav",
  template: `
    <ul class="text-blue-500 ml-8 whitespace-nowrap">
      @for (link of sideNavLinks(); track link.href) {
        <li class="p-1"
          ><a [href]="link.href">{{ link.text }}</a></li
        >
      }
    </ul>
  `,
})
export class SideNavComponent {
  sideNavLinks = input.required<SideNavLink[]>();
}
