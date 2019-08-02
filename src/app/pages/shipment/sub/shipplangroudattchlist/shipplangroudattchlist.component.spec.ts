import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipplangroudattchlistComponent } from './shipplangroudattchlist.component';

describe('ShipplangroudattchlistComponent', () => {
  let component: ShipplangroudattchlistComponent;
  let fixture: ComponentFixture<ShipplangroudattchlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipplangroudattchlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipplangroudattchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
