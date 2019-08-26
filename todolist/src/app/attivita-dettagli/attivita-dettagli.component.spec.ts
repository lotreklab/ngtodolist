import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttivitaDettagliComponent } from './attivita-dettagli.component';

describe('AttivitaDettagliComponent', () => {
  let component: AttivitaDettagliComponent;
  let fixture: ComponentFixture<AttivitaDettagliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttivitaDettagliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttivitaDettagliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
