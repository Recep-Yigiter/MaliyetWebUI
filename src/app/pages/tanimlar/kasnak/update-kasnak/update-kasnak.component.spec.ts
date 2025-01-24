import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKasnakComponent } from './update-kasnak.component';

describe('UpdateKasnakComponent', () => {
  let component: UpdateKasnakComponent;
  let fixture: ComponentFixture<UpdateKasnakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateKasnakComponent]
    });
    fixture = TestBed.createComponent(UpdateKasnakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
