import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamboComponent } from './sambo.component';

describe('SamboComponent', () => {
  let component: SamboComponent;
  let fixture: ComponentFixture<SamboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamboComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SamboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
