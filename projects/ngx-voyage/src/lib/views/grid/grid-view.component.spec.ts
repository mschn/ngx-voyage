import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Store } from "../../model/store";
import { GridViewComponent } from "./grid-view.component";

describe("GridViewComponent", () => {
  let component: GridViewComponent;
  let fixture: ComponentFixture<GridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridViewComponent],
      providers: [Store],
    }).compileComponents();

    fixture = TestBed.createComponent(GridViewComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput("path", "/");
    fixture.componentRef.setInput("files", []);

    jest.spyOn(component.previewFile, "emit");
    jest.spyOn(component.openFile, "emit");
    jest.spyOn(component.path, "set");
  });

  it("should be truthy", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
