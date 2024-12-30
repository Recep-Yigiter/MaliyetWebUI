import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KapiComponent } from './kapi.component';

describe('KapiComponent', () => {
  let component: KapiComponent;
  let fixture: ComponentFixture<KapiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KapiComponent]
    });
    fixture = TestBed.createComponent(KapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
