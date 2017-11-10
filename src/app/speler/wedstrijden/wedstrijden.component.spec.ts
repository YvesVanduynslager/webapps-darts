import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WedstrijdDetailComponent } from './wedstrijden.component';

describe('WedstrijdDetailComponent', () => {
  let component: WedstrijdDetailComponent;
  let fixture: ComponentFixture<WedstrijdDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WedstrijdDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WedstrijdDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
