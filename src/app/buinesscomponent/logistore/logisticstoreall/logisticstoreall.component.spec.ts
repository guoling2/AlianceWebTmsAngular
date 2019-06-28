import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticstoreallComponent } from './logisticstoreall.component';

describe('LogisticstoreallComponent', () => {
  let component: LogisticstoreallComponent;
  let fixture: ComponentFixture<LogisticstoreallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticstoreallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticstoreallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
