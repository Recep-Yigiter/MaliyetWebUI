import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKapiComponent } from './create-kapi.component';

describe('CreateKapiComponent', () => {
  let component: CreateKapiComponent;
  let fixture: ComponentFixture<CreateKapiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateKapiComponent]
    });
    fixture = TestBed.createComponent(CreateKapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
