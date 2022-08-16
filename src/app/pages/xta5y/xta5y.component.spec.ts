import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Xta5yComponent } from './xta5y.component';

describe('Xta5yComponent', () => {
  let component: Xta5yComponent;
  let fixture: ComponentFixture<Xta5yComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Xta5yComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Xta5yComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
