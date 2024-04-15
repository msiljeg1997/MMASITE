import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualniComponent } from './individualni.component';

describe('IndividualniComponent', () => {
  let component: IndividualniComponent;
  let fixture: ComponentFixture<IndividualniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
