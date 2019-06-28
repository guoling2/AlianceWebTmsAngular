import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GengerctracknumComponent } from './gengerctracknum.component';

describe('GengerctracknumComponent', () => {
  let component: GengerctracknumComponent;
  let fixture: ComponentFixture<GengerctracknumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GengerctracknumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GengerctracknumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
