import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomertaxComponent } from './customertax.component';

describe('CustomertaxComponent', () => {
  let component: CustomertaxComponent;
  let fixture: ComponentFixture<CustomertaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomertaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomertaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
