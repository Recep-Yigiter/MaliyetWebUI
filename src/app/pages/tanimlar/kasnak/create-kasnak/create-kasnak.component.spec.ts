import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKasnakComponent } from './create-kasnak.component';

describe('CreateKasnakComponent', () => {
  let component: CreateKasnakComponent;
  let fixture: ComponentFixture<CreateKasnakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateKasnakComponent]
    });
    fixture = TestBed.createComponent(CreateKasnakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
