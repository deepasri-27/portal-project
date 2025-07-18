import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorFinanceAgingComponent } from './vendor-finance-aging.component';

describe('VendorFinanceAgingComponent', () => {
  let component: VendorFinanceAgingComponent;
  let fixture: ComponentFixture<VendorFinanceAgingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorFinanceAgingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorFinanceAgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
