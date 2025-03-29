import { Component, HostListener } from "@angular/core";
import { BaseViewComponent } from "../base-view.component";
import { VoyageIconComponent } from "../../icon";
import { ContextMenuModule } from "primeng/contextmenu";
import { PreviewComponent } from "../../preview/preview.component";
import { NgClass } from "@angular/common";

@Component({
  selector: "ngx-voyage-grid-view",
  templateUrl: "./grid-view.component.html",
  imports: [VoyageIconComponent, ContextMenuModule, PreviewComponent, NgClass],
  styleUrl: "./grid-view.component.css",
})
export class GridViewComponent extends BaseViewComponent {
  @HostListener("window:keydown", ["$event"])
  onKeydown(event: KeyboardEvent) {
    const selected = this.selectedFile();
    if (event.key === "ArrowLeft") {
      this.selectNextOrPreviousFile(-1);
    }
    if (event.key === "ArrowRight") {
      this.selectNextOrPreviousFile(1);
    }
    if (event.key === "Enter" && selected) {
      this.onDoubleClick(selected);
    }
  }
}
