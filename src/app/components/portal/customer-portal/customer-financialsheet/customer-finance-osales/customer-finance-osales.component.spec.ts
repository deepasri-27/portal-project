import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFinanceOsalesComponent } from './customer-finance-osales.component';

describe('CustomerFinanceOsalesComponent', () => {
  let component: CustomerFinanceOsalesComponent;
  let fixture: ComponentFixture<CustomerFinanceOsalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFinanceOsalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFinanceOsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
