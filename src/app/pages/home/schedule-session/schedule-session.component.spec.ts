import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleSessionComponent } from './schedule-session.component';
import { HorarioService } from '../../../core/services/horario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ScheduleSessionComponent', () => {
  let component: ScheduleSessionComponent;
  let fixture: ComponentFixture<ScheduleSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ScheduleSessionComponent],
      providers: [HorarioService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when fields are empty', () => {
    expect(component.horarioForm.valid).toBeFalsy();
  });

  it('should have a valid form when all fields are filled', () => {
    component.horarioForm.setValue({
      fecha: '2024-11-10',
      horaInicio: '10:00',
      horaFin: '11:00',
      descripcion: 'Sesión de prueba'
    });
    expect(component.horarioForm.valid).toBeTruthy();
  });

  it('should call onSubmit when the form is submitted', () => {
    spyOn(component, 'onSubmit');
    component.horarioForm.setValue({
      fecha: '2024-11-10',
      horaInicio: '10:00',
      horaFin: '11:00',
      descripcion: 'Sesión de prueba'
    });
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
