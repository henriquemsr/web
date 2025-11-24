import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dahsboard } from './dahsboard';

describe('Dahsboard', () => {
  let component: Dahsboard;
  let fixture: ComponentFixture<Dahsboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dahsboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dahsboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
