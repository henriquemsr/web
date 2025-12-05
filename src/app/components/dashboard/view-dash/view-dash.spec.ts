import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDash } from './view-dash';

describe('ViewDash', () => {
  let component: ViewDash;
  let fixture: ComponentFixture<ViewDash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDash);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
