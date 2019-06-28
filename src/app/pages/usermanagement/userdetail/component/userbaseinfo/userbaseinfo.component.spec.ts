import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbaseinfoComponent } from './userbaseinfo.component';

describe('UserbaseinfoComponent', () => {
  let component: UserbaseinfoComponent;
  let fixture: ComponentFixture<UserbaseinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserbaseinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserbaseinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
