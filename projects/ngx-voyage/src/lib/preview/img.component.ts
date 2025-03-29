import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  OnDestroy,
  viewChild,
} from "@angular/core";

@Component({
  selector: "ngx-voyage-img",
  template: ` <img #img alt="image preview" /> `,
  styles: `
    img {
      max-width: 90vw;
      max-height: 90vh;
      margin: 0 auto;
    }
  `,
})
export class ImgComponent implements AfterViewInit, OnDestroy {
  data = input.required<Blob>();
  iframe = viewChild<ElementRef<HTMLIFrameElement>>("img");

  objectUrl: string | undefined;

  ngAfterViewInit(): void {
    this.objectUrl = URL.createObjectURL(this.data());
    const elt = this.iframe()?.nativeElement;
    if (elt) {
      elt.src = this.objectUrl;
    }
  }

  ngOnDestroy() {
    URL.revokeObjectURL(this.objectUrl!);
  }
}
