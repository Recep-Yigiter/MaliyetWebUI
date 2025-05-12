import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenelComponent } from './genel.component';

describe('GenelComponent', () => {
  let component: GenelComponent;
  let fixture: ComponentFixture<GenelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenelComponent]
    });
    fixture = TestBed.createComponent(GenelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
