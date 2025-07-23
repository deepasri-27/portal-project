import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorFinanceDefaultComponent } from './vendor-finance-default.component';

describe('VendorFinanceDefaultComponent', () => {
  let component: VendorFinanceDefaultComponent;
  let fixture: ComponentFixture<VendorFinanceDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorFinanceDefaultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorFinanceDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
