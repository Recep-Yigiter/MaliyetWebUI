import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspansiyonComponent } from './suspansiyon.component';

describe('SuspansiyonComponent', () => {
  let component: SuspansiyonComponent;
  let fixture: ComponentFixture<SuspansiyonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuspansiyonComponent]
    });
    fixture = TestBed.createComponent(SuspansiyonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
