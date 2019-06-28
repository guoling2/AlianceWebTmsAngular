import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mylogistiscstore2Component } from './mylogistiscstore2.component';

describe('Mylogistiscstore2Component', () => {
  let component: Mylogistiscstore2Component;
  let fixture: ComponentFixture<Mylogistiscstore2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mylogistiscstore2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mylogistiscstore2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
