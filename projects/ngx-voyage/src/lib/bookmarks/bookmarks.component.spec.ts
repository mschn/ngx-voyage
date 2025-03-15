import { BookmarksComponent } from "./bookmarks.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Store } from "../model/store";
import { signal } from "@angular/core";
import { Bookmark } from "../model/bookmark";
import {
  getAllByTestId,
  getByTestId,
  queryByTestId,
} from "@testing-library/dom";
describe("BookmarksComponent", () => {
  let component: BookmarksComponent;
  let fixture: ComponentFixture<BookmarksComponent>;

  const bookmarks = signal<Bookmark[]>([]);

  const storeMock = {
    showHiddenFiles: signal(true),
    showOpenFile: signal(true),
    bookmarks,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarksComponent],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarksComponent);
    component = fixture.componentInstance;
    bookmarks.set([]);
    fixture.componentRef.setInput("path", "/aaa");
  });

  it("should create", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should show 0 bookmarks", () => {
    fixture.detectChanges();
    expect(queryByTestId(fixture.nativeElement, "bookmark")).toBeFalsy();
  });

  it("should show 2 bookmarks", () => {
    bookmarks.set([
      { icon: "bookmark", name: "Aaa", path: "/aaa" },
      { icon: "bookmark", name: "Bbb", path: "/bbb" },
    ]);
    fixture.detectChanges();
    expect(
      getAllByTestId(fixture.nativeElement, "bookmark").map((e) =>
        e.textContent?.trim(),
      ),
    ).toEqual(["Aaa", "Bbb"]);
  });

  it("should detect active bookmark", () => {
    expect(
      component.isActive({ icon: "bookmark", name: "Aaa", path: "/aaa" }),
    ).toBe(true);
    expect(
      component.isActive({ icon: "bookmark", name: "Bbb", path: "/bbb" }),
    ).toBe(false);
  });

  it("should open a bookmark", () => {
    bookmarks.set([{ icon: "bookmark", name: "Bbb", path: "/bbb" }]);
    fixture.detectChanges();
    expect(component.path()).toEqual("/aaa");
    getByTestId(fixture.nativeElement, "bookmark")
      .querySelector("button")
      ?.click();
    expect(component.path()).toEqual("/bbb");
  });
});
