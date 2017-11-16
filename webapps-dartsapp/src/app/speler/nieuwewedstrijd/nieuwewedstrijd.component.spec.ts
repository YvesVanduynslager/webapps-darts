import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NieuwewedstrijdComponent } from './nieuwewedstrijd.component';

describe('NieuwewedstrijdComponent', () => {
  let component: NieuwewedstrijdComponent;
  let fixture: ComponentFixture<NieuwewedstrijdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NieuwewedstrijdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NieuwewedstrijdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
