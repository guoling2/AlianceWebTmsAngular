import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderrouteplanComponent } from './orderrouteplan.component';

describe('OrderrouteplanComponent', () => {
  let component: OrderrouteplanComponent;
  let fixture: ComponentFixture<OrderrouteplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderrouteplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderrouteplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
