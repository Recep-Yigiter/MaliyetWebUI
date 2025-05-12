import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSuspansiyonComponent } from './update-suspansiyon.component';

describe('UpdateSuspansiyonComponent', () => {
  let component: UpdateSuspansiyonComponent;
  let fixture: ComponentFixture<UpdateSuspansiyonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSuspansiyonComponent]
    });
    fixture = TestBed.createComponent(UpdateSuspansiyonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
