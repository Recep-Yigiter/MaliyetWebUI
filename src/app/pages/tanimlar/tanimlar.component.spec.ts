import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TanimlarComponent } from './tanimlar.component';

describe('TanimlarComponent', () => {
  let component: TanimlarComponent;
  let fixture: ComponentFixture<TanimlarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TanimlarComponent]
    });
    fixture = TestBed.createComponent(TanimlarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
