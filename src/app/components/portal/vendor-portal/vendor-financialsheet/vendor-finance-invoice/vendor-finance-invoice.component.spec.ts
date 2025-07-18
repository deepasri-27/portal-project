import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorFinanceInvoiceComponent } from './vendor-finance-invoice.component';

describe('VendorFinanceInvoiceComponent', () => {
  let component: VendorFinanceInvoiceComponent;
  let fixture: ComponentFixture<VendorFinanceInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorFinanceInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorFinanceInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
