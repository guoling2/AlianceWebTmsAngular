import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAbnormalProcessResultComponent } from './order-abnormal-process-result.component';

describe('OrderAbnormalProcessResultComponent', () => {
  let component: OrderAbnormalProcessResultComponent;
  let fixture: ComponentFixture<OrderAbnormalProcessResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAbnormalProcessResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAbnormalProcessResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
