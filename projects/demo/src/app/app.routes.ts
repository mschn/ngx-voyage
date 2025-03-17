import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    title: "ngx-voyage",
    path: "",
    data: { name: "ngx-voyage" },
    loadComponent: () =>
      import("./routes/home.component").then((c) => c.HomeComponent),
  },
  {
    title: "ngx-voyage - Quickstart",
    path: "quickstart",
    data: { name: "Quickstart" },
    loadComponent: () =>
      import("./routes/quickstart.component").then(
        (c) => c.QuickstartComponent,
      ),
  },
  {
    title: "ngx-voyage - Guide",
    path: "guide",
    data: { name: "Howto Guide" },
    loadComponent: () =>
      import("./routes/guide.component").then((c) => c.GuideComponent),
  },
];
