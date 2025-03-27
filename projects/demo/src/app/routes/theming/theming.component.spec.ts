import { ComponentFixture, TestBed } from "@angular/core/testing";
import { getByText } from "@testing-library/dom";
import { ThemingComponent } from "./theming.component";

describe("ThemingComponent", () => {
  let component: ThemingComponent;
  let fixture: ComponentFixture<ThemingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemingComponent);
    component = fixture.componentInstance;
  });

  it("should be truthy", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(getByText(fixture.nativeElement, "Theming")).toBeTruthy();
  });
});
