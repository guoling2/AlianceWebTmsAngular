import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectdriverComponent } from './selectdriver.component';

describe('SelectdriverComponent', () => {
  let component: SelectdriverComponent;
  let fixture: ComponentFixture<SelectdriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectdriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectdriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
