import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaOdrasleComponent } from './za-odrasle.component';

describe('ZaOdrasleComponent', () => {
  let component: ZaOdrasleComponent;
  let fixture: ComponentFixture<ZaOdrasleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaOdrasleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZaOdrasleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
