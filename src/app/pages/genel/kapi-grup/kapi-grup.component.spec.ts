import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KapiGrupComponent } from './kapi-grup.component';

describe('KapiGrupComponent', () => {
  let component: KapiGrupComponent;
  let fixture: ComponentFixture<KapiGrupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KapiGrupComponent]
    });
    fixture = TestBed.createComponent(KapiGrupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
