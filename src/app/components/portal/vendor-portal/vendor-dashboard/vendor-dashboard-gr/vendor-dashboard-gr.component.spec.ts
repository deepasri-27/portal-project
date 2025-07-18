import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDashboardGrComponent } from './vendor-dashboard-gr.component';

describe('VendorDashboardGrComponent', () => {
  let component: VendorDashboardGrComponent;
  let fixture: ComponentFixture<VendorDashboardGrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorDashboardGrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorDashboardGrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
