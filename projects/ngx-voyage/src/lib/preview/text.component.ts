import { AfterViewInit, Component, input, signal } from "@angular/core";
import { getLanguageClass, highlight } from "../model/highlight";

@Component({
  selector: "ngx-voyage-text",
  template: ` <div
    class="bg-white dark:bg-[#0d1117] mx-auto max-w-[90vw] h-[90vh] overflow-y-auto p-3 "
  >
    <pre
      class="whitespace-pre-wrap text-s theme-github"
    ><code class="hljs {{codeClass()}}">{{ text() }}</code></pre>
  </div>`,
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
