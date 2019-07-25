import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticitemsComponent } from './logisticitems.component';

describe('LogisticitemsComponent', () => {
  let component: LogisticitemsComponent;
  let fixture: ComponentFixture<LogisticitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
