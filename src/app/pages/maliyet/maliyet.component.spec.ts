import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaliyetComponent } from './maliyet.component';

describe('MaliyetComponent', () => {
  let component: MaliyetComponent;
  let fixture: ComponentFixture<MaliyetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaliyetComponent]
    });
    fixture = TestBed.createComponent(MaliyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
