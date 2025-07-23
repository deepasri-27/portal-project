import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFinanceDefaultComponent } from './customer-finance-default.component';

describe('CustomerFinanceDefaultComponent', () => {
  let component: CustomerFinanceDefaultComponent;
  let fixture: ComponentFixture<CustomerFinanceDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFinanceDefaultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFinanceDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
