import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinstoreComponent } from './userinstore.component';

describe('UserinstoreComponent', () => {
  let component: UserinstoreComponent;
  let fixture: ComponentFixture<UserinstoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserinstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserinstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
