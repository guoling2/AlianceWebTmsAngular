import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendsonghuolistfortransferComponent } from './sendsonghuolistfortransfer.component';

describe('SendsonghuolistfortransferComponent', () => {
  let component: SendsonghuolistfortransferComponent;
  let fixture: ComponentFixture<SendsonghuolistfortransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendsonghuolistfortransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendsonghuolistfortransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
