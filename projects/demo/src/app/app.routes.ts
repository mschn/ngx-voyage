import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    title: "ngx-voyage",
    path: "",
    data: { name: "ngx-voyage" },
    loadComponent: () =>
      import("./routes/home/home.component").then((c) => c.HomeComponent),
  },
  {
    title: "ngx-voyage - Quickstart",
    path: "quickstart",
    data: { name: "Quickstart" },
    loadComponent: () =>
      import("./routes/quickstart/quickstart.component").then(
        (c) => c.QuickstartComponent,
      ),
  },
  {
    title: "ngx-voyage - Guide",
    path: "guide",
    data: { name: "Howto Guide" },
    loadComponent: () =>
      import("./routes/guide/guide.component").then((c) => c.GuideComponent),
  },
  {
    title: "ngx-voyage - Reference",
    path: "reference",
    data: { name: "Reference" },
    loadComponent: () =>
      import("./routes/reference/ref.component").then(
        (c) => c.ReferenceComponent,
      ),
  },
  {
    title: "ngx-voyage - Theming",
    path: "theming",
    data: { name: "Theming" },
    loadComponent: () =>
      import("./routes/theming/theming.component").then(
        (c) => c.ThemingComponent,
      ),
  },
];
