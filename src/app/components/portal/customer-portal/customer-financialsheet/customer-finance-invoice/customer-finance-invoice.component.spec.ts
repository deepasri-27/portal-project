import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFinanceInvoiceComponent } from './customer-finance-invoice.component';

describe('CustomerFinanceInvoiceComponent', () => {
  let component: CustomerFinanceInvoiceComponent;
  let fixture: ComponentFixture<CustomerFinanceInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFinanceInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFinanceInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
