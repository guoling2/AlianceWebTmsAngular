import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorderComponent } from './selectorder.component';

describe('SelectorderComponent', () => {
  let component: SelectorderComponent;
  let fixture: ComponentFixture<SelectorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
