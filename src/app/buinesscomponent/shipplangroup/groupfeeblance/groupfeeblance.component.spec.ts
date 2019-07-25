import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupfeeblanceComponent } from './groupfeeblance.component';

describe('GroupfeeblanceComponent', () => {
  let component: GroupfeeblanceComponent;
  let fixture: ComponentFixture<GroupfeeblanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupfeeblanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupfeeblanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
