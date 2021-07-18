import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimNangCaoComponent } from './tim-nang-cao.component';

describe('TimNangCaoComponent', () => {
  let component: TimNangCaoComponent;
  let fixture: ComponentFixture<TimNangCaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimNangCaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimNangCaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
