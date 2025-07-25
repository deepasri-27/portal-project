import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPortalComponent } from './vendor-portal.component';

describe('VendorPortalComponent', () => {
  let component: VendorPortalComponent;
  let fixture: ComponentFixture<VendorPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorPortalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
