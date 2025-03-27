import { NgClass } from "@angular/common";
import { Component, computed, model } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { updatePreset, usePreset } from "@primeng/themes";
import Aura from "@primeng/themes/aura";
import Lara from "@primeng/themes/lara";
import Material from "@primeng/themes/material";
import Nora from "@primeng/themes/nora";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import { ButtonModule } from "primeng/button";
import { SelectButtonModule } from "primeng/selectbutton";
import { NgxVoyageComponent } from "../../../../../ngx-voyage/src/public-api";
import { filesMock } from "../../mocks/files.mock";

type Color = "blue" | "red" | "indigo" | "green" | "zinc";
type Theme = "aura" | "lara" | "nora" | "material";

@Component({
  selector: "app-theming",
  templateUrl: "./theming.component.html",
  imports: [
    NgxVoyageComponent,
    ButtonModule,
    SelectButtonModule,
    FormsModule,
    NgClass,
  ],
})
export class ThemingComponent {
  files = filesMock["/home/voyage"];

  selectedTheme = model<Theme>("aura");
  themeOptions: { value: Theme; name: string }[] = [
    {
      value: "aura",
      name: "Aura",
    },
    {
      value: "lara",
      name: "Lara",
    },
    {
      value: "nora",
      name: "Nora",
    },
    {
      value: "material",
      name: "Material",
    },
  ];

  selectedColor = model<Color>("blue");
  colorOptions: { value: Color; name: string }[] = [
    {
      value: "blue",
      name: "Blue",
    },
    {
      value: "red",
      name: "Red",
    },
    {
      value: "indigo",
      name: "indigo",
    },
    {
      value: "green",
      name: "green",
    },
    {
      value: "zinc",
      name: "Zinc",
    },
  ];

  constructor() {
    hljs.registerLanguage("typescript", typescript);
  }

  changeColor() {
    this.setColor(this.selectedColor());
  }

  changeTheme() {
    if (this.selectedTheme() === "aura") {
      usePreset(Aura);
    } else if (this.selectedTheme() === "lara") {
      usePreset(Lara);
    } else if (this.selectedTheme() === "nora") {
      usePreset(Nora);
    } else if (this.selectedTheme() === "material") {
      usePreset(Material);
    }
    this.changeColor();
  }

  setColor(color: Color) {
    updatePreset({
      semantic: {
        primary: {
          50: `{${color}.50}`,
          100: `{${color}.100}`,
          200: `{${color}.200}`,
          300: `{${color}.300}`,
          400: `{${color}.400}`,
          500: `{${color}.500}`,
          600: `{${color}.600}`,
          700: `{${color}.700}`,
          800: `{${color}.800}`,
          900: `{${color}.900}`,
          950: `{${color}.950}`,
        },
      },
    });
  }

  themeCode = computed(
    () =>
      `export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: definePreset(${this.selectedTheme()[0].toUpperCase()}${this.selectedTheme().substring(1)}, {
          semantic: {
            primary: {
              50: "{${this.selectedColor()}.50}",
              100: "{${this.selectedColor()}.100}",
              200: "{${this.selectedColor()}.200}",
              300: "{${this.selectedColor()}.300}",
              400: "{${this.selectedColor()}.400}",
              500: "{${this.selectedColor()}.500}",
              600: "{${this.selectedColor()}.600}",
              700: "{${this.selectedColor()}.700}",
              800: "{${this.selectedColor()}.800}",
              900: "{${this.selectedColor()}.900}",
              950: "{${this.selectedColor()}.950}",
            },
          },
        }),
      },
    }),
  ],
};`,
  );

  themeCodeHighlighted = computed(
    () => hljs.highlight(this.themeCode(), { language: "typescript" }).value,
  );
}
