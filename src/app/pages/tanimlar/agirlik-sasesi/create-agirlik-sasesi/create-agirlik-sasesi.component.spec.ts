import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAgirlikSasesiComponent } from './create-agirlik-sasesi.component';

describe('CreateAgirlikSasesiComponent', () => {
  let component: CreateAgirlikSasesiComponent;
  let fixture: ComponentFixture<CreateAgirlikSasesiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAgirlikSasesiComponent]
    });
    fixture = TestBed.createComponent(CreateAgirlikSasesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
