import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDashboardSalesComponent } from './customer-dashboard-sales.component';

describe('CustomerDashboardSalesComponent', () => {
  let component: CustomerDashboardSalesComponent;
  let fixture: ComponentFixture<CustomerDashboardSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDashboardSalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDashboardSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
