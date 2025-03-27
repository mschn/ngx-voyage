import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { getAllByTestId } from "@testing-library/dom";
import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it("should be truthy", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should show 4 files", () => {
    fixture.detectChanges();
    expect(
      getAllByTestId(fixture.nativeElement, "files-grid-name").map((e) =>
        e.textContent?.trim(),
      ),
    ).toEqual([
      "screenshots",
      "example.component.ts",
      "README.md",
      "LICENSE.md",
    ]);
  });
});
