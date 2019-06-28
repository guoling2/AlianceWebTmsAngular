import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomertaxaddComponent } from './customertaxadd.component';

describe('CustomertaxaddComponent', () => {
  let component: CustomertaxaddComponent;
  let fixture: ComponentFixture<CustomertaxaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomertaxaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomertaxaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
