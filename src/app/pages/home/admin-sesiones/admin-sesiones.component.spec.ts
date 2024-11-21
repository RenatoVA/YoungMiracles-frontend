import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSesionesComponent } from './admin-sesiones.component';

describe('AdminSesionesComponent', () => {
  let component: AdminSesionesComponent;
  let fixture: ComponentFixture<AdminSesionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSesionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSesionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
