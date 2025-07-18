import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFinanceAgingComponent } from './customer-finance-aging.component';

describe('CustomerFinanceAgingComponent', () => {
  let component: CustomerFinanceAgingComponent;
  let fixture: ComponentFixture<CustomerFinanceAgingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFinanceAgingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFinanceAgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
