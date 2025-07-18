import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDashboardPoComponent } from './vendor-dashboard-po.component';

describe('VendorDashboardPoComponent', () => {
  let component: VendorDashboardPoComponent;
  let fixture: ComponentFixture<VendorDashboardPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorDashboardPoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorDashboardPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
