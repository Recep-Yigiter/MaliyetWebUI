import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KabinMaliyetComponent } from './kabin-maliyet.component';

describe('KabinMaliyetComponent', () => {
  let component: KabinMaliyetComponent;
  let fixture: ComponentFixture<KabinMaliyetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KabinMaliyetComponent]
    });
    fixture = TestBed.createComponent(KabinMaliyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
