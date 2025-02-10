import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKapiGrupComponent } from './update-kapi-grup.component';

describe('UpdateKapiGrupComponent', () => {
  let component: UpdateKapiGrupComponent;
  let fixture: ComponentFixture<UpdateKapiGrupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateKapiGrupComponent]
    });
    fixture = TestBed.createComponent(UpdateKapiGrupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
