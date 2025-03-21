import { Component } from "@angular/core";
import { BaseViewComponent } from "../base-view.component";
import { VoyageIconComponent } from "../../icon";

@Component({
  selector: "ngx-voyage-grid-view",
  templateUrl: "./grid-view.component.html",
  imports: [VoyageIconComponent],
})
export class GridViewComponent extends BaseViewComponent {}
