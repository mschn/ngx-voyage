import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SettingsComponent } from "./settings.component";
import { Store } from "../model/store";
import { getByText } from "@testing-library/dom";

describe("SettingsComponent", () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsComponent],
      providers: [Store],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should change view type", () => {
    const store = TestBed.inject(Store);
    fixture.detectChanges();
    expect(store.selectedView()).toEqual("grid");
    getByText(fixture.nativeElement, "List view").click();
    fixture.detectChanges();
    expect(store.selectedView()).toEqual("list");
  });

  it("should toggle hidden files", () => {
    const store = TestBed.inject(Store);
    fixture.detectChanges();
    expect(store.showHiddenFiles()).toBe(false);
    getByText(fixture.nativeElement, "Show hidden files").click();
    fixture.detectChanges();
    expect(store.showHiddenFiles()).toBe(true);
  });
});
