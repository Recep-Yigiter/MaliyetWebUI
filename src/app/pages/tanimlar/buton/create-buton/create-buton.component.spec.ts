import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateButonComponent } from './create-buton.component';

describe('CreateButonComponent', () => {
  let component: CreateButonComponent;
  let fixture: ComponentFixture<CreateButonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateButonComponent]
    });
    fixture = TestBed.createComponent(CreateButonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
