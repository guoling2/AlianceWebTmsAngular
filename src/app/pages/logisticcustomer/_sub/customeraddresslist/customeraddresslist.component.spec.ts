import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeraddresslistComponent } from './customeraddresslist.component';

describe('CustomeraddresslistComponent', () => {
  let component: CustomeraddresslistComponent;
  let fixture: ComponentFixture<CustomeraddresslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomeraddresslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeraddresslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
