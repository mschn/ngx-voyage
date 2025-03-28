import { ComponentFixture, TestBed } from "@angular/core/testing";
import { getByText } from "@testing-library/dom";
import { ReferenceComponent } from "./ref.component";
import { ActivatedRoute } from "@angular/router";

describe("ReferenceComponent", () => {
  let component: ReferenceComponent;
  let fixture: ComponentFixture<ReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenceComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { fragment: "" } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReferenceComponent);
    component = fixture.componentInstance;
  });

  it("should be truthy", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(getByText(fixture.nativeElement, "Reference")).toBeTruthy();
  });
});
