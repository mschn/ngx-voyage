import { Component, computed, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToggleSwitchModule } from "primeng/toggleswitch";
import { TranslatePipe } from "../i18n/translate.pipe";
import { Store } from "../model/store";
import { RadioButtonModule } from "primeng/radiobutton";

@Component({
  selector: "ngx-voyage-settings",
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ToggleSwitchModule,
    TranslatePipe,
    RadioButtonModule,
  ],
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.css",
})
export class SettingsComponent {
  store = inject(Store);

  sortValue = computed(
    () => `${this.store.sort()?.field}_${this.store.sort()?.order}`,
  );
}
