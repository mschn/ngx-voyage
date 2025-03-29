import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideNoopAnimations } from "@angular/platform-browser/animations";
import { getByText, queryByText } from "@testing-library/dom";
import { Store } from "../model/store";
import { FilesViewComponent } from "./files-view.component";

describe("FilesViewComponent", () => {
  let component: FilesViewComponent;
  let fixture: ComponentFixture<FilesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesViewComponent],
      providers: [Store, provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(FilesViewComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput("path", "/");
    fixture.componentRef.setInput("files", []);

    jest.spyOn(component.previewFile, "emit");
    jest.spyOn(component.openFile, "emit");
  });

  it("should display an empty folder message", () => {
    fixture.detectChanges();

    expect(
      getByText(fixture.nativeElement, "This folder is empty"),
    ).toBeTruthy();
  });

  it("should display a loading state", () => {
    fixture.componentRef.setInput("loading", true);
    fixture.detectChanges();

    expect(
      queryByText(fixture.nativeElement, "This folder is empty"),
    ).toBeFalsy();
    expect(fixture.nativeElement.querySelector("p-progressbar")).toBeTruthy();
  });

  it("should display a message", () => {
    fixture.componentRef.setInput("message", {
      type: "info",
      text: "Hello test",
    });
    fixture.detectChanges();

    expect(
      queryByText(fixture.nativeElement, "This folder is empty"),
    ).toBeFalsy();
    expect(fixture.nativeElement.querySelector("p-progressbar")).toBeFalsy();
    expect(getByText(fixture.nativeElement, "Hello test")).toBeTruthy();
  });
});
