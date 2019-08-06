import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendsonghuolistforcircleriptripComponent } from './sendsonghuolistforcircleriptrip.component';

describe('SendsonghuolistforcircleriptripComponent', () => {
  let component: SendsonghuolistforcircleriptripComponent;
  let fixture: ComponentFixture<SendsonghuolistforcircleriptripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendsonghuolistforcircleriptripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendsonghuolistforcircleriptripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
