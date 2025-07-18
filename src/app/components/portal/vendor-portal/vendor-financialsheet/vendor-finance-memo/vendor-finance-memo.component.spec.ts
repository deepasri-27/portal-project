import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorFinanceMemoComponent } from './vendor-finance-memo.component';

describe('VendorFinanceMemoComponent', () => {
  let component: VendorFinanceMemoComponent;
  let fixture: ComponentFixture<VendorFinanceMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorFinanceMemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorFinanceMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
