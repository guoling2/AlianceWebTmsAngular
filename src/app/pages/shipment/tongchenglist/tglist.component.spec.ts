import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TglistComponent } from './tglist.component';

describe('TglistComponent', () => {
  let component: TglistComponent;
  let fixture: ComponentFixture<TglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
