import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatSamboComponent } from './combat-sambo.component';

describe('CombatSamboComponent', () => {
  let component: CombatSamboComponent;
  let fixture: ComponentFixture<CombatSamboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombatSamboComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombatSamboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
