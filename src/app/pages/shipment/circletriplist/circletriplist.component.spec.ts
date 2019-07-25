import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircletriplistComponent } from './circletriplist.component';

describe('CircletriplistComponent', () => {
  let component: CircletriplistComponent;
  let fixture: ComponentFixture<CircletriplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircletriplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircletriplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
