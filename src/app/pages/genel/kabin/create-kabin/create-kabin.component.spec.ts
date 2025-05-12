import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKabinComponent } from './create-kabin.component';

describe('CreateKabinComponent', () => {
  let component: CreateKabinComponent;
  let fixture: ComponentFixture<CreateKabinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateKabinComponent]
    });
    fixture = TestBed.createComponent(CreateKabinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
