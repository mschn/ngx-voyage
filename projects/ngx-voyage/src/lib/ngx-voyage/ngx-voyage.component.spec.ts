import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { getByTestId, getByText, queryByTestId } from "@testing-library/dom";
import { getFileMock } from "../model/model.mock";
import { Store } from "../model/store";
import { NgxVoyageComponent } from "./ngx-voyage.component";

@Component({
  selector: "ngx-voyage-test",
  imports: [NgxVoyageComponent],
  template: `
    <ngx-voyage path="/" [files]="[]">
      <ng-template #header>Heading there</ng-template>
      <ng-template #footer>Just a foot</ng-template>
    </ngx-voyage>
  `,
})
class TestComponent {}

describe("NgxVoyageComponent templates", () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(getByText(fixture.nativeElement, "Heading there")).toBeTruthy();
    expect(getByText(fixture.nativeElement, "Just a foot")).toBeTruthy();
  });
});

describe("NgxVoyageComponent", () => {
  let component: NgxVoyageComponent;
  let fixture: ComponentFixture<NgxVoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxVoyageComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxVoyageComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput("path", "/foo/bar");
    fixture.componentRef.setInput("files", []);
  });

  afterEach(() => localStorage.clear());

  it("should create", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should add the home bookmark on init", () => {
    const store = TestBed.inject(Store);
    expect(store.bookmarks()).toEqual([]);
    fixture.detectChanges();
    expect(store.bookmarks()).toEqual([
      { icon: "home", name: "Home", path: "/foo/bar" },
    ]);
  });

  it("should add file types", () => {
    fixture.componentRef.setInput("files", [
      getFileMock({ name: "foo.txt" }),
      getFileMock({ name: "blah.pdf" }),
    ]);
    fixture.detectChanges();
    expect(component.files()[0].type).toBe("PLAIN_TEXT");
    expect(component.files()[1].type).toBe("PDF_DOCUMENT");
  });

  it("should show the grid view", () => {
    fixture.detectChanges();
    expect(getByTestId(fixture.nativeElement, "grid-view")).toBeTruthy();
    expect(queryByTestId(fixture.nativeElement, "list-view")).toBeFalsy();
  });

  it("should show the grid view", () => {
    const store = TestBed.inject(Store);
    store.setSelectedView("list");
    fixture.detectChanges();
    expect(queryByTestId(fixture.nativeElement, "grid-view")).toBeFalsy();
    expect(getByTestId(fixture.nativeElement, "list-view")).toBeTruthy();
  });
});
