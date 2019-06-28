import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreleaveComponent } from './storeleave.component';

describe('StoreleaveComponent', () => {
  let component: StoreleaveComponent;
  let fixture: ComponentFixture<StoreleaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreleaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
