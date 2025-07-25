import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolAtaModalComponent } from './rol-ata-modal.component';

describe('RolAtaModalComponent', () => {
  let component: RolAtaModalComponent;
  let fixture: ComponentFixture<RolAtaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolAtaModalComponent]
    });
    fixture = TestBed.createComponent(RolAtaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
