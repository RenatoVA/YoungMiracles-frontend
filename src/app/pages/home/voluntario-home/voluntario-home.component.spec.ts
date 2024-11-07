import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntarioHomeComponent } from './voluntario-home.component';

describe('VoluntarioHomeComponent', () => {
  let component: VoluntarioHomeComponent;
  let fixture: ComponentFixture<VoluntarioHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoluntarioHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoluntarioHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
