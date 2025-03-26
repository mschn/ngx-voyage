import { NgClass } from "@angular/common";
import { Component, input, OnInit, signal } from "@angular/core";

export interface SideNavLink {
  id: string;
  href: string;
  text: string;
}

@Component({
  selector: "app-sidenav",
  imports: [NgClass],
  template: `
    <ul class="text-blue-500 ml-8 whitespace-nowrap">
      @for (link of sideNavLinks(); track link.id) {
        <li
          class="p-1 rounded-md"
          [ngClass]="{ 'bg-gray-200': activeLink() === link.id }"
          ><a [href]="link.href">{{ link.text }}</a></li
        >
      }
    </ul>
  `,
})
export class SideNavComponent implements OnInit {
  sideNavLinks = input.required<SideNavLink[]>();
  activeLink = signal<string | undefined>(undefined);

  ngOnInit(): void {
    const changeNav: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          this.activeLink.set(entry.target.id);
          return;
        }
      }
    };

    const observer = new IntersectionObserver(changeNav, {
      root: document,
      threshold: 0,
    });
    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });
  }
}
