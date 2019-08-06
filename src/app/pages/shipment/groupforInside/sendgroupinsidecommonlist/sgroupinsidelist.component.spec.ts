import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SgroupinsidelistComponent } from './sgroupinsidelist.component';

describe('SgroupinsidelistComponent', () => {
  let component: SgroupinsidelistComponent;
  let fixture: ComponentFixture<SgroupinsidelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SgroupinsidelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SgroupinsidelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
