import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKapiGrupComponent } from './create-kapi-grup.component';

describe('CreateKapiGrupComponent', () => {
  let component: CreateKapiGrupComponent;
  let fixture: ComponentFixture<CreateKapiGrupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateKapiGrupComponent]
    });
    fixture = TestBed.createComponent(CreateKapiGrupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
