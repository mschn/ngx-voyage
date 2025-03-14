import { Component, HostListener, input, output } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { TranslatePipe } from "../i18n/translate.pipe";
import { VoyageIconComponent } from "../icon";
import { ImageExtensions, TextExtensions } from "../model/file-types";
import { getExtension } from "../model/model";
import { ImgComponent } from "./img.component";
import { PdfComponent } from "./pdf.component";
import { TextComponent } from "./text.component";

@Component({
  selector: "ngx-voyage-preview",
  imports: [
    ButtonModule,
    PdfComponent,
    ImgComponent,
    TextComponent,
    TranslatePipe,
    VoyageIconComponent,
  ],
  templateUrl: "./preview.component.html",
})
export class PreviewComponent {
  data = input.required<Blob>();
  name = input.required<string>();
  closed = output<void>();

  @HostListener("document:keydown.escape", ["$event"]) onKeydownHandler() {
    this.closed.emit();
  }

  isPdf() {
    return this.name()?.endsWith(".pdf");
  }

  isImage() {
    const ext = getExtension(this.name());
    if (ext) {
      return ImageExtensions.includes(ext);
    }
    return false;
  }

  isText() {
    const ext = getExtension(this.name());
    if (ext) {
      return TextExtensions.includes(ext);
    }
    return false;
  }
}
