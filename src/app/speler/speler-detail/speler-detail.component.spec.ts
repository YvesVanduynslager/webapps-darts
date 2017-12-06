import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpelerDetailComponent } from './speler-detail.component';

describe('SpelerDetailComponent', () => {
  let component: SpelerDetailComponent;
  let fixture: ComponentFixture<SpelerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpelerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpelerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
