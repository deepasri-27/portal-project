import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFinanceMemoComponent } from './customer-finance-memo.component';

describe('CustomerFinanceMemoComponent', () => {
  let component: CustomerFinanceMemoComponent;
  let fixture: ComponentFixture<CustomerFinanceMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFinanceMemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFinanceMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
