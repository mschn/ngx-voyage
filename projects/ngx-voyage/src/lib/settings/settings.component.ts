import { Component, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToggleSwitchModule } from "primeng/toggleswitch";
import { TranslatePipe } from "../i18n/translate.pipe";
import { Store } from "../model/store";

@Component({
  selector: "ngx-voyage-settings",
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ToggleSwitchModule,
    TranslatePipe,
  ],
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.css",
})
export class SettingsComponent {
  store = inject(Store);
}
