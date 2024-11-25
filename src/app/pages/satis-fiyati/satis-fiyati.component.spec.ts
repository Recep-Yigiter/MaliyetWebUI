import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisFiyatiComponent } from './satis-fiyati.component';

describe('SatisFiyatiComponent', () => {
  let component: SatisFiyatiComponent;
  let fixture: ComponentFixture<SatisFiyatiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SatisFiyatiComponent]
    });
    fixture = TestBed.createComponent(SatisFiyatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
