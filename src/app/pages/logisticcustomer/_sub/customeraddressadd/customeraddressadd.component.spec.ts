import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeraddressaddComponent } from './customeraddressadd.component';

describe('CustomeraddressaddComponent', () => {
  let component: CustomeraddressaddComponent;
  let fixture: ComponentFixture<CustomeraddressaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomeraddressaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeraddressaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
