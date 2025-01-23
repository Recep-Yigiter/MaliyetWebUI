import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateButonComponent } from './update-buton.component';

describe('UpdateButonComponent', () => {
  let component: UpdateButonComponent;
  let fixture: ComponentFixture<UpdateButonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateButonComponent]
    });
    fixture = TestBed.createComponent(UpdateButonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
