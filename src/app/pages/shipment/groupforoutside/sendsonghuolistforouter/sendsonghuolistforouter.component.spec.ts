import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendsonghuolistforouterComponent } from './sendsonghuolistforouter.component';

describe('SendsonghuolistforouterComponent', () => {
  let component: SendsonghuolistforouterComponent;
  let fixture: ComponentFixture<SendsonghuolistforouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendsonghuolistforouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendsonghuolistforouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
