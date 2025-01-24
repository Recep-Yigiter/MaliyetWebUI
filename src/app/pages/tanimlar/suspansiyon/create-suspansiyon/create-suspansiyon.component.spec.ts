import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSuspansiyonComponent } from './create-suspansiyon.component';

describe('CreateSuspansiyonComponent', () => {
  let component: CreateSuspansiyonComponent;
  let fixture: ComponentFixture<CreateSuspansiyonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSuspansiyonComponent]
    });
    fixture = TestBed.createComponent(CreateSuspansiyonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
