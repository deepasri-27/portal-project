import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDashboardRfqComponent } from './vendor-dashboard-rfq.component';

describe('VendorDashboardRfqComponent', () => {
  let component: VendorDashboardRfqComponent;
  let fixture: ComponentFixture<VendorDashboardRfqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorDashboardRfqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorDashboardRfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
