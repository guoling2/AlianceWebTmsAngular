import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaditemComponent } from './headitem.component';

describe('HeaditemComponent', () => {
  let component: HeaditemComponent;
  let fixture: ComponentFixture<HeaditemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaditemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
