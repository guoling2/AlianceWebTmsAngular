import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TihuoinsertComponent } from './tihuoinsert.component';

describe('TihuoinsertComponent', () => {
  let component: TihuoinsertComponent;
  let fixture: ComponentFixture<TihuoinsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TihuoinsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TihuoinsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
