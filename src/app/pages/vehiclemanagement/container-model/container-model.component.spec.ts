import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerModelComponent } from './container-model.component';

describe('ContainerModelComponent', () => {
  let component: ContainerModelComponent;
  let fixture: ComponentFixture<ContainerModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
