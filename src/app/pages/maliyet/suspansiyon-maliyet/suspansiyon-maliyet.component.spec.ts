import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspansiyonMaliyetComponent } from './suspansiyon-maliyet.component';

describe('SuspansiyonMaliyetComponent', () => {
  let component: SuspansiyonMaliyetComponent;
  let fixture: ComponentFixture<SuspansiyonMaliyetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuspansiyonMaliyetComponent]
    });
    fixture = TestBed.createComponent(SuspansiyonMaliyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
