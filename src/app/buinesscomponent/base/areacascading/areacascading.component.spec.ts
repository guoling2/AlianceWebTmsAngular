import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreacascadingComponent } from './areacascading.component';

describe('AreacascadingComponent', () => {
  let component: AreacascadingComponent;
  let fixture: ComponentFixture<AreacascadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreacascadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreacascadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
