import { Component } from "@angular/core";
import { BaseViewComponent } from "../base-view.component";
import { VoyageIconComponent } from "../../icon";
import { ContextMenuModule } from "primeng/contextmenu";
import { PreviewComponent } from "../../preview/preview.component";

@Component({
  selector: "ngx-voyage-grid-view",
  templateUrl: "./grid-view.component.html",
  imports: [VoyageIconComponent, ContextMenuModule, PreviewComponent],
})
export class GridViewComponent extends BaseViewComponent {}
