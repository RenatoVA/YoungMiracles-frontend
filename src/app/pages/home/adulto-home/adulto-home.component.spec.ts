import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdultoHomeComponent } from './adulto-home.component';

describe('AdultoHomeComponent', () => {
  let component: AdultoHomeComponent;
  let fixture: ComponentFixture<AdultoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdultoHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdultoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
