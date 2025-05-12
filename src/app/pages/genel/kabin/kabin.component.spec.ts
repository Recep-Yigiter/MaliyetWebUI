import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KabinComponent } from './kabin.component';

describe('KabinComponent', () => {
  let component: KabinComponent;
  let fixture: ComponentFixture<KabinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KabinComponent]
    });
    fixture = TestBed.createComponent(KabinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
