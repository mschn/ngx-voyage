import { AfterViewInit, Component, input, signal } from "@angular/core";
import { getLanguageClass, highlight } from "../model/highlight";

@Component({
  selector: "ngx-voyage-text",
  template: ` <div class="text ">
    <pre
      class="theme-github"
    ><code class="hljs {{codeClass()}}">{{ text() }}</code></pre>
  </div>`,
  styles: `
    :host {
      display: flex;
      flex: 1;
    }

    .text {
      background: var(--p-content-background);
      margin: 0 auto;
      max-width: 90vw;
      overflow-y: auto;
      padding: 0.75rem;
      flex: 1;

      pre {
        white-space: pre-wrap;
        font-size: 0.9rem;
      }
    }
  `,
})
export class TextComponent implements AfterViewInit {
  data = input.required<Blob>();
  name = input.required<string>();
  text = signal<string>("");
  codeClass = signal("");

  ngAfterViewInit(): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.text.set(reader.result?.toString() ?? "");
      this.codeClass.set(getLanguageClass(this.name()));

      setTimeout(() => {
        highlight(this.name());
      });
    };
    reader.readAsText(this.data());
  }
}
