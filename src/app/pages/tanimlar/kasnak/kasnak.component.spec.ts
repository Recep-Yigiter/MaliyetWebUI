import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KasnakComponent } from './kasnak.component';

describe('KasnakComponent', () => {
  let component: KasnakComponent;
  let fixture: ComponentFixture<KasnakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KasnakComponent]
    });
    fixture = TestBed.createComponent(KasnakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
