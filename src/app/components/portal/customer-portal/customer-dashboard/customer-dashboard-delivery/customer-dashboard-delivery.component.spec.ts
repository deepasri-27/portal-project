import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDashboardDeliveryComponent } from './customer-dashboard-delivery.component';

describe('CustomerDashboardDeliveryComponent', () => {
  let component: CustomerDashboardDeliveryComponent;
  let fixture: ComponentFixture<CustomerDashboardDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDashboardDeliveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDashboardDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
