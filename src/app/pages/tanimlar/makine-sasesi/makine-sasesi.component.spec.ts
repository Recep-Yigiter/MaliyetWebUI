import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakineSasesiComponent } from './makine-sasesi.component';

describe('MakineSasesiComponent', () => {
  let component: MakineSasesiComponent;
  let fixture: ComponentFixture<MakineSasesiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakineSasesiComponent]
    });
    fixture = TestBed.createComponent(MakineSasesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
