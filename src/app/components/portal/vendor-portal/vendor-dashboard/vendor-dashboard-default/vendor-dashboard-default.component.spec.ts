import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDashboardDefaultComponent } from './vendor-dashboard-default.component';

describe('VendorDashboardDefaultComponent', () => {
  let component: VendorDashboardDefaultComponent;
  let fixture: ComponentFixture<VendorDashboardDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorDashboardDefaultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorDashboardDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
