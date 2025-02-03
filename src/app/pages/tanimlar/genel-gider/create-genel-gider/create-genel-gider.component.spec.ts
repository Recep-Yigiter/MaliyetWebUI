import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGenelGiderComponent } from './create-genel-gider.component';

describe('CreateGenelGiderComponent', () => {
  let component: CreateGenelGiderComponent;
  let fixture: ComponentFixture<CreateGenelGiderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGenelGiderComponent]
    });
    fixture = TestBed.createComponent(CreateGenelGiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
