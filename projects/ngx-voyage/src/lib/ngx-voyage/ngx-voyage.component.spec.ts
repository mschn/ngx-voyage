import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgxVoyageComponent } from "./ngx-voyage.component";
import { Component } from "@angular/core";
import { getByText } from "@testing-library/dom";
import { Store } from "../model/store";
import { getFileMock } from "../model/model.mock";

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
});
