import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from "@angular/core/testing";
import { getAllByTestId } from "@testing-library/dom";
import { Store } from "../model/store";
import { TitleComponent } from "./title.component";

describe("TitleComponent", () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleComponent],
      providers: [Store],
    }).compileComponents();

    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("path", "/");
  });

  it("should display an empty folder message", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should display the title fragments", () => {
    fixture.componentRef.setInput("path", "/foo/bar/baz/");
    fixture.detectChanges();
    expect(
      getAllByTestId(fixture.nativeElement, "title-fragment").map((e) =>
        e.textContent?.trim(),
      ),
    ).toEqual(["", "foo", "bar", "baz"]);
  });

  it("should handle root path", () => {
    fixture.detectChanges();
    expect(
      getAllByTestId(fixture.nativeElement, "title-fragment").map((e) =>
        e.textContent?.trim(),
      ),
    ).toEqual([""]);
  });

  it("should detect bookmarked path", () => {
    const store = TestBed.inject(Store);
    store.addBookmark({ icon: "home", name: "foo", path: "/foo" });
    fixture.componentRef.setInput("path", "/foo");
    fixture.detectChanges();
    expect(component.pathIsBookmarked()).toBe(true);
  });

  it("should add a bookmark", fakeAsync(() => {
    fixture.componentRef.setInput("path", "/oink");
    fixture.detectChanges();
    expect(component.pathIsBookmarked()).toBe(false);
    component.onAddBookmark({} as Event);
    flush();
    expect(component.pathIsBookmarked()).toBe(true);
  }));

  it("should remove a bookmark", () => {
    const store = TestBed.inject(Store);
    store.addBookmark({ icon: "home", name: "oink", path: "/oink" });
    fixture.componentRef.setInput("path", "/oink");
    fixture.detectChanges();
    expect(component.pathIsBookmarked()).toBe(true);
    component.onRemoveBookmark();
    expect(component.pathIsBookmarked()).toBe(false);
  });

  it("should go back and forward", () => {
    fixture.componentRef.setInput("path", "/foo");
    fixture.detectChanges();
    fixture.componentRef.setInput("path", "/foo/bar");
    fixture.detectChanges();
    expect(component.history()).toEqual(["/foo", "/foo/bar"]);
    expect(component.path()).toEqual("/foo/bar");
    component.onBack();
    expect(component.path()).toEqual("/foo");
    component.onForward();
    expect(component.path()).toEqual("/foo/bar");
  });
});
