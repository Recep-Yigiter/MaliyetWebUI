import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKapiComponent } from './update-kapi.component';

describe('UpdateKapiComponent', () => {
  let component: UpdateKapiComponent;
  let fixture: ComponentFixture<UpdateKapiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateKapiComponent]
    });
    fixture = TestBed.createComponent(UpdateKapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
