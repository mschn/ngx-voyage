import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
} from "@angular/core/testing";
import { provideNoopAnimations } from "@angular/platform-browser/animations";
import { getByTestId, getByText, queryByText } from "@testing-library/dom";
import { getFileMock } from "../model/model.mock";
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

  it("should rename a file", fakeAsync(() => {
    const store = TestBed.inject(Store);
    jest.spyOn(component.renameFile, "emit");
    store.selectedFile.set(getFileMock({ name: "foo.txt" }));
    component.onRenameFile();
    fixture.detectChanges();
    flush();
    expect(component.renameFileName()).toEqual("foo.txt");
    getByTestId(fixture.nativeElement, "rename-button")
      ?.querySelector("button")
      ?.click();
    fixture.detectChanges();
    flush();

    expect(component.renameFile.emit).toHaveBeenCalledTimes(1);
    expect(component.showRenameModal()).toBe(false);
  }));

  it("should delete a file", fakeAsync(() => {
    const store = TestBed.inject(Store);
    jest.spyOn(component.deleteFile, "emit");
    store.selectedFile.set(getFileMock({ name: "foo.txt" }));
    component.onDeleteFile();
    fixture.detectChanges();
    flush();
    getByTestId(fixture.nativeElement, "delete-button")
      ?.querySelector("button")
      ?.click();
    fixture.detectChanges();
    flush();

    expect(component.deleteFile.emit).toHaveBeenCalledTimes(1);
    expect(component.showDeleteModal()).toBe(false);
  }));
});
