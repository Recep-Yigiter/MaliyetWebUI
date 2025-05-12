import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgirlikSasesiComponent } from './agirlik-sasesi.component';

describe('AgirlikSasesiComponent', () => {
  let component: AgirlikSasesiComponent;
  let fixture: ComponentFixture<AgirlikSasesiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgirlikSasesiComponent]
    });
    fixture = TestBed.createComponent(AgirlikSasesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
