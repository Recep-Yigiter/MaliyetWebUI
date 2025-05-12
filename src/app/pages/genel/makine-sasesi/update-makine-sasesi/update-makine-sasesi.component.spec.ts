import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMakineSasesiComponent } from './update-makine-sasesi.component';

describe('UpdateMakineSasesiComponent', () => {
  let component: UpdateMakineSasesiComponent;
  let fixture: ComponentFixture<UpdateMakineSasesiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMakineSasesiComponent]
    });
    fixture = TestBed.createComponent(UpdateMakineSasesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
