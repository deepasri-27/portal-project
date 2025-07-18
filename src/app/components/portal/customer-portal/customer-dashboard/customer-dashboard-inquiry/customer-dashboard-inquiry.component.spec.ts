import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDashboardInquiryComponent } from './customer-dashboard-inquiry.component';

describe('CustomerDashboardInquiryComponent', () => {
  let component: CustomerDashboardInquiryComponent;
  let fixture: ComponentFixture<CustomerDashboardInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDashboardInquiryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDashboardInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
