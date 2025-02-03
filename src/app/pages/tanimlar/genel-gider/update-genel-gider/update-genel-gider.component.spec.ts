import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGenelGiderComponent } from './update-genel-gider.component';

describe('UpdateGenelGiderComponent', () => {
  let component: UpdateGenelGiderComponent;
  let fixture: ComponentFixture<UpdateGenelGiderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateGenelGiderComponent]
    });
    fixture = TestBed.createComponent(UpdateGenelGiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
