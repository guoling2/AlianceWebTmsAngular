import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendcarfeedetailinsertComponent } from './sendcarfeedetailinsert.component';

describe('SendcarfeedetailinsertComponent', () => {
  let component: SendcarfeedetailinsertComponent;
  let fixture: ComponentFixture<SendcarfeedetailinsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendcarfeedetailinsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendcarfeedetailinsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
