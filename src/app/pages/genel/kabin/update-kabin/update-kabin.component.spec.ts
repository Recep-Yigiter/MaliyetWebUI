import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKabinComponent } from './update-kabin.component';

describe('UpdateKabinComponent', () => {
  let component: UpdateKabinComponent;
  let fixture: ComponentFixture<UpdateKabinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateKabinComponent]
    });
    fixture = TestBed.createComponent(UpdateKabinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
