import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButonMaliyetComponent } from './buton-maliyet.component';

describe('ButonMaliyetComponent', () => {
  let component: ButonMaliyetComponent;
  let fixture: ComponentFixture<ButonMaliyetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButonMaliyetComponent]
    });
    fixture = TestBed.createComponent(ButonMaliyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
