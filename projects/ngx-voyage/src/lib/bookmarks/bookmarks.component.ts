import { Component, computed, inject, model } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { VoyageIconComponent } from "../icon";
import { Bookmark } from "../model/bookmark";
import { Store } from "../model/store";

@Component({
  selector: "ngx-voyage-bookmarks",
  templateUrl: "./bookmarks.component.html",
  imports: [ButtonModule, VoyageIconComponent],
})
export class BookmarksComponent {
  #store = inject(Store);

  path = model.required<string>();
  bookmarks = this.#store.bookmarks;


  open(bookmark: Bookmark) {
    this.path.set(bookmark.path);
  }

  isActive(bookmark: Bookmark) {
    return this.path() === bookmark.path;
  }
}
