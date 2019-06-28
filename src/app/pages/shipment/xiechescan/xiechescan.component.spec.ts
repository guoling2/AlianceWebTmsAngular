import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XiechescanComponent } from './xiechescan.component';

describe('XiechescanComponent', () => {
  let component: XiechescanComponent;
  let fixture: ComponentFixture<XiechescanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XiechescanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XiechescanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
