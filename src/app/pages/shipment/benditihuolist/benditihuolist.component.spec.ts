import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenditihuolistComponent } from './benditihuolist.component';

describe('BenditihuolistComponent', () => {
  let component: BenditihuolistComponent;
  let fixture: ComponentFixture<BenditihuolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenditihuolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenditihuolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
