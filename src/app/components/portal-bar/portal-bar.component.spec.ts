import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalBarComponent } from './portal-bar.component';

describe('PortalBarComponent', () => {
  let component: PortalBarComponent;
  let fixture: ComponentFixture<PortalBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
