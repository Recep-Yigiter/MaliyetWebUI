import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KabinMaliyetTablosuComponent } from './kabin-maliyet-tablosu.component';

describe('KabinMaliyetTablosuComponent', () => {
  let component: KabinMaliyetTablosuComponent;
  let fixture: ComponentFixture<KabinMaliyetTablosuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KabinMaliyetTablosuComponent]
    });
    fixture = TestBed.createComponent(KabinMaliyetTablosuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
