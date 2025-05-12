import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAgirlikSasesiComponent } from './update-agirlik-sasesi.component';

describe('UpdateAgirlikSasesiComponent', () => {
  let component: UpdateAgirlikSasesiComponent;
  let fixture: ComponentFixture<UpdateAgirlikSasesiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAgirlikSasesiComponent]
    });
    fixture = TestBed.createComponent(UpdateAgirlikSasesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
