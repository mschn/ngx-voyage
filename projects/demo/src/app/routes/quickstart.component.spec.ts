import { ComponentFixture, TestBed } from "@angular/core/testing";
import { getByText } from "@testing-library/dom";
import { QuickstartComponent } from "./quickstart.component";

describe("QuickstartComponent", () => {
  let component: QuickstartComponent;
  let fixture: ComponentFixture<QuickstartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickstartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickstartComponent);
    component = fixture.componentInstance;
  });

  it("should be truthy", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(getByText(fixture.nativeElement, "Howto Guide")).toBeTruthy();
  });
});
