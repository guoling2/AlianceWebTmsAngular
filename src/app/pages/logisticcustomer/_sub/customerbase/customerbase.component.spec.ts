import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerbaseComponent } from './customerbase.component';

describe('CustomerbaseComponent', () => {
  let component: CustomerbaseComponent;
  let fixture: ComponentFixture<CustomerbaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerbaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
