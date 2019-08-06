import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendsonghuolistfortihuoComponent } from './sendsonghuolistfortihuo.component';

describe('SendsonghuolistfortihuoComponent', () => {
  let component: SendsonghuolistfortihuoComponent;
  let fixture: ComponentFixture<SendsonghuolistfortihuoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendsonghuolistfortihuoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendsonghuolistfortihuoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
