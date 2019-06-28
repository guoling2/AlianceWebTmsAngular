import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackBindComponent } from './track-bind.component';

describe('TrackBindComponent', () => {
  let component: TrackBindComponent;
  let fixture: ComponentFixture<TrackBindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackBindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackBindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
