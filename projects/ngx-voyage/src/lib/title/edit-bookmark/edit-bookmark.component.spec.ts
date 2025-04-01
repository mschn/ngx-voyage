import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Bookmark } from "../../model/bookmark";
import { Store } from "../../model/store";
import { EditBookmarkComponent } from "./edit-bookmark.component";

describe("EditBookmarkComponent", () => {
  let component: EditBookmarkComponent;
  let fixture: ComponentFixture<EditBookmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBookmarkComponent],
      providers: [Store],
    }).compileComponents();

    fixture = TestBed.createComponent(EditBookmarkComponent);
    component = fixture.componentInstance;
  });

  it("should be truthy", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should save the bookmark", () => {
    const store = TestBed.inject(Store);
    const bookmark: Bookmark = {
      name: "Aaa",
      path: "/a",
      icon: "home",
    };
    store.addBookmark(bookmark);
    fixture.componentRef.setInput("bookmark", bookmark);
    fixture.detectChanges();
    component.name.set("bbb");
    component.save();
    expect(store.bookmarks()).toEqual([
      {
        name: "bbb",
        path: "/a",
        icon: "home",
      },
    ]);
  });

  it("should delete the bookmark", () => {
    const store = TestBed.inject(Store);
    const bookmark: Bookmark = {
      name: "Aaa",
      path: "/a",
      icon: "home",
    };
    store.addBookmark(bookmark);
    fixture.componentRef.setInput("bookmark", bookmark);
    fixture.detectChanges();
    component.remove();
    expect(store.bookmarks()).toEqual([]);
  });
});
