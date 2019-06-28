import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadorderlistComponent } from './badorderlist.component';

describe('BadorderlistComponent', () => {
  let component: BadorderlistComponent;
  let fixture: ComponentFixture<BadorderlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadorderlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadorderlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
