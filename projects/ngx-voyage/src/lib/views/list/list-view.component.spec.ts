import { ComponentFixture, TestBed } from "@angular/core/testing";
import { getAllByTestId, getByTestId, queryByText } from "@testing-library/dom";
import { getFileMock } from "../../model/model.mock";
import { Store } from "../../model/store";
import { ListViewComponent } from "./list-view.component";

describe("ListViewComponent", () => {
  let component: ListViewComponent;
  let fixture: ComponentFixture<ListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListViewComponent],
      providers: [Store],
    }).compileComponents();

    fixture = TestBed.createComponent(ListViewComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput("path", "/");
    fixture.componentRef.setInput("files", []);

    jest.spyOn(component.previewFile, "emit");
    jest.spyOn(component.openFile, "emit");
    jest.spyOn(component.path, "set");
  });

  it("should not display hidden files", () => {
    fixture.componentRef.setInput("files", [getFileMock({ name: ".foo.txt" })]);
    fixture.detectChanges();
    expect(queryByText(fixture.nativeElement, ".foo.txt")).toBeFalsy();
  });

  it("should display hidden files", () => {
    const store = TestBed.inject(Store);
    store.toggleHiddenFiles();
    fixture.componentRef.setInput("files", [getFileMock({ name: ".foo.txt" })]);
    fixture.detectChanges();
    expect(
      getByTestId(fixture.nativeElement, "files-list-name").textContent,
    ).toEqual(".foo.txt");
  });

  it("should sort files by name ASC", () => {
    fixture.componentRef.setInput("files", [
      getFileMock({ name: "Bbb" }),
      getFileMock({ name: "Ccc" }),
      getFileMock({ name: "Aaa" }),
    ]);
    component.onSort({ order: 1, field: "name" });
    fixture.detectChanges();
    expect(
      getAllByTestId(fixture.nativeElement, "files-list-name").map((e) =>
        e.textContent?.trim(),
      ),
    ).toEqual(["Aaa", "Bbb", "Ccc"]);
  });

  it("should sort files by name DESC", () => {
    fixture.componentRef.setInput("files", [
      getFileMock({ name: "Bbb" }),
      getFileMock({ name: "Ccc" }),
      getFileMock({ name: "Aaa" }),
    ]);
    component.onSort({ order: -1, field: "name" });
    fixture.detectChanges();
    expect(
      getAllByTestId(fixture.nativeElement, "files-list-name").map((e) =>
        e.textContent?.trim(),
      ),
    ).toEqual(["Ccc", "Bbb", "Aaa"]);
  });

  it("should reset file sort", () => {
    fixture.componentRef.setInput("files", [
      getFileMock({ name: "Bbb" }),
      getFileMock({ name: "Ccc" }),
      getFileMock({ name: "Aaa" }),
    ]);
    component.sortOrder.set(-1);
    component.sortField.set("name");
    component.onSort({ order: 1, field: "name" });
    fixture.detectChanges();
    expect(
      getAllByTestId(fixture.nativeElement, "files-list-name").map((e) =>
        e.textContent?.trim(),
      ),
    ).toEqual(["Bbb", "Ccc", "Aaa"]);
  });

  it("should select the first file", () => {
    fixture.componentRef.setInput("files", [
      getFileMock({ name: "Bbb" }),
      getFileMock({ name: "Ccc" }),
      getFileMock({ name: "Aaa" }),
    ]);
    fixture.detectChanges();
    component.onKeydown({ key: "ArrowDown" } as KeyboardEvent);
    expect(component.selectedFile()?.name).toEqual("Bbb");
  });

  it("should select the second file", () => {
    fixture.componentRef.setInput("files", [
      getFileMock({ name: "Bbb" }),
      getFileMock({ name: "Ccc" }),
      getFileMock({ name: "Aaa" }),
    ]);
    fixture.detectChanges();
    component.onKeydown({ key: "ArrowDown" } as KeyboardEvent);
    component.onKeydown({ key: "ArrowDown" } as KeyboardEvent);
    expect(component.selectedFile()?.name).toEqual("Ccc");
  });

  it("should select the third file", () => {
    fixture.componentRef.setInput("files", [
      getFileMock({ name: "Bbb" }),
      getFileMock({ name: "Ccc" }),
      getFileMock({ name: "Aaa" }),
    ]);
    fixture.detectChanges();
    component.onKeydown({ key: "ArrowUp" } as KeyboardEvent);
    component.onKeydown({ key: "ArrowDown" } as KeyboardEvent);
    component.onKeydown({ key: "ArrowUp" } as KeyboardEvent);
    component.onKeydown({ key: "ArrowDown" } as KeyboardEvent);
    component.onKeydown({ key: "ArrowDown" } as KeyboardEvent);
    expect(component.selectedFile()?.name).toEqual("Aaa");
  });

  it("should preview file on double click", () => {
    const file = getFileMock({ name: "foo.png" });
    fixture.componentRef.setInput("files", [file]);
    fixture.detectChanges();
    component.onDoubleClick(file);
    expect(component.previewFile.emit).toHaveBeenCalled();
    expect(component.openFile.emit).not.toHaveBeenCalled();
    expect(component.path.set).not.toHaveBeenCalled();
  });

  it("should open file on double click", () => {
    const file = getFileMock({ name: "foo.exe" });
    fixture.componentRef.setInput("files", [file]);
    fixture.detectChanges();
    component.onDoubleClick(file);
    expect(component.previewFile.emit).not.toHaveBeenCalled();
    expect(component.openFile.emit).toHaveBeenCalled();
    expect(component.path.set).not.toHaveBeenCalled();
  });

  it("should open folder on double click", () => {
    const file = getFileMock({ name: "foo", isDirectory: true, isFile: false });
    fixture.componentRef.setInput("files", [file]);
    fixture.detectChanges();
    component.onDoubleClick(file);
    expect(component.previewFile.emit).not.toHaveBeenCalled();
    expect(component.openFile.emit).not.toHaveBeenCalled();
    expect(component.path.set).toHaveBeenCalled();
  });

  it("should open folder on enter", () => {
    const file = getFileMock({ name: "foo", isDirectory: true, isFile: false });
    fixture.componentRef.setInput("files", [file]);
    fixture.detectChanges();
    component.onKeydown({ key: "ArrowDown" } as KeyboardEvent);
    component.onKeydown({ key: "Enter" } as KeyboardEvent);
    component.onDoubleClick(file);
    expect(component.previewFile.emit).not.toHaveBeenCalled();
    expect(component.openFile.emit).not.toHaveBeenCalled();
    expect(component.path.set).toHaveBeenCalled();
  });

  it("should open the context menu for a folder", () => {
    const file = getFileMock({ name: "foo", isDirectory: true, isFile: false });
    fixture.componentRef.setInput("files", [file]);
    fixture.detectChanges();
    const currentTarget = document.querySelector("tr");
    component.onContextMenu(
      {
        currentTarget,
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      } as unknown as MouseEvent,
      file,
    );
    expect(component.menuItems[0].visible).toBe(false);
    expect(component.menuItems[1].visible).toBe(true);
  });
});
