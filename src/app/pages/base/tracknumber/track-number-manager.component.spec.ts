import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackNumberManagerComponent } from './track-number-manager.component';

describe('TrackNumberManagerComponent', () => {
  let component: TrackNumberManagerComponent;
  let fixture: ComponentFixture<TrackNumberManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackNumberManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackNumberManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
