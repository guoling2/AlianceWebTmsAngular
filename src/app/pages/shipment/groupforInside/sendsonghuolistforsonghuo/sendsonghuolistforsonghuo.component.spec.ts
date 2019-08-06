import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendsonghuolistforsonghuoComponent } from './sendsonghuolistforsonghuo.component';

describe('SendsonghuolistforsonghuoComponent', () => {
  let component: SendsonghuolistforsonghuoComponent;
  let fixture: ComponentFixture<SendsonghuolistforsonghuoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendsonghuolistforsonghuoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendsonghuolistforsonghuoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
