import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiplentplanComponent } from './shiplentplan.component';

describe('ShiplentplanComponent', () => {
  let component: ShiplentplanComponent;
  let fixture: ComponentFixture<ShiplentplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiplentplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiplentplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
