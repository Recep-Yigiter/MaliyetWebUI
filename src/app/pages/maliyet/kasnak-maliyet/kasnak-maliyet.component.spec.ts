import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KasnakMaliyetComponent } from './kasnak-maliyet.component';

describe('KasnakMaliyetComponent', () => {
  let component: KasnakMaliyetComponent;
  let fixture: ComponentFixture<KasnakMaliyetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KasnakMaliyetComponent]
    });
    fixture = TestBed.createComponent(KasnakMaliyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
