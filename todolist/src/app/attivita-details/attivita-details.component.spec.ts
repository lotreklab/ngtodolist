import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttivitaDetailsComponent } from './attivita-details.component';

describe('AttivitaDetailsComponent', () => {
  let component: AttivitaDetailsComponent;
  let fixture: ComponentFixture<AttivitaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttivitaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttivitaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
