import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KapiMaliyetComponent } from './kapi-maliyet.component';

describe('KapiMaliyetComponent', () => {
  let component: KapiMaliyetComponent;
  let fixture: ComponentFixture<KapiMaliyetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KapiMaliyetComponent]
    });
    fixture = TestBed.createComponent(KapiMaliyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
