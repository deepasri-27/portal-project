import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDashboardDefaultComponent } from './customer-dashboard-default.component';

describe('CustomerDashboardDefaultComponent', () => {
  let component: CustomerDashboardDefaultComponent;
  let fixture: ComponentFixture<CustomerDashboardDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDashboardDefaultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDashboardDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
