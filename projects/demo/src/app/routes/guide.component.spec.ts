import { ComponentFixture, TestBed } from "@angular/core/testing";
import { getByText } from "@testing-library/dom";
import { GuideComponent } from "./guide.component";

describe("GuideComponent", () => {
  let component: GuideComponent;
  let fixture: ComponentFixture<GuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GuideComponent);
    component = fixture.componentInstance;
  });

  it("should be truthy", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(getByText(fixture.nativeElement, "Howto Guide")).toBeTruthy();
  });
});
