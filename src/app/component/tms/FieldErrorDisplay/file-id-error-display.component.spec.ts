import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileIdErrorDisplayComponent } from './file-id-error-display.component';

describe('FileIdErrorDisplayComponent', () => {
  let component: FileIdErrorDisplayComponent;
  let fixture: ComponentFixture<FileIdErrorDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileIdErrorDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileIdErrorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
