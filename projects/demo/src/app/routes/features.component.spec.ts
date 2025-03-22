import { ComponentFixture, TestBed } from "@angular/core/testing";
import { getByText } from "@testing-library/dom";
import { FeaturesComponent } from "./features.component";

describe("FeaturesComponent", () => {
  let component: FeaturesComponent;
  let fixture: ComponentFixture<FeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesComponent);
    component = fixture.componentInstance;
  });

  it("should be truthy", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(getByText(fixture.nativeElement, "Features")).toBeTruthy();
  });
});
