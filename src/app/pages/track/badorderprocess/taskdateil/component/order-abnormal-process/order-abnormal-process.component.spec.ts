import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAbnormalProcessComponent } from './order-abnormal-process.component';

describe('OrderAbnormalProcessComponent', () => {
  let component: OrderAbnormalProcessComponent;
  let fixture: ComponentFixture<OrderAbnormalProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAbnormalProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAbnormalProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
