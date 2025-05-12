import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMakineSasesiComponent } from './create-makine-sasesi.component';

describe('CreateMakineSasesiComponent', () => {
  let component: CreateMakineSasesiComponent;
  let fixture: ComponentFixture<CreateMakineSasesiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMakineSasesiComponent]
    });
    fixture = TestBed.createComponent(CreateMakineSasesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
