import { Component, model } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { DrawerModule } from "primeng/drawer";
import { routes } from "./app.routes";
import { NavComponent } from "./nav.component";
import { VoyageIconComponent } from "ngx-voyage";

@Component({
  selector: "app-root",
  imports: [
    RouterOutlet,
    NavComponent,
    DrawerModule,
    ButtonModule,
    VoyageIconComponent,
  ],
  template: `
    <div class="flex h-full w-full overflow-auto bg-gray-100 dark:bg-gray-800">
      <div class="flex container mx-auto p-2">
        <div class="hidden md:block sticky top-0">
          <app-nav></app-nav>
        </div>
        <p-drawer [(visible)]="showMenu">
          <app-nav></app-nav>
        </p-drawer>

        <div class="flex flex-col h-full flex-1  ">
          <div class="md:hidden">
            <p-button
              (click)="showMenu.set(true)"
              outlined="true"
              severity="secondary"
            >
              <ngx-voyage-icon type="bars"></ngx-voyage-icon>
            </p-button>
          </div>

          <div>
            <router-outlet></router-outlet>
          </div>
          <div class="my-2 mt-24 text-gray-500  text-sm text-center">
            &copy;
            <a
              href="https://github.com/mschn"
              target="_blank"
              rel="noopener noreferrer"
              >Mathieu Schnoor</a
            >
            2025
            <div class="h-2"></div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent {
  routes = routes;
  showMenu = model(false);
}
