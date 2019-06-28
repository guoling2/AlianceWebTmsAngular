import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoselectedComponent } from './noselected.component';

describe('NoselectedComponent', () => {
  let component: NoselectedComponent;
  let fixture: ComponentFixture<NoselectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoselectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoselectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
