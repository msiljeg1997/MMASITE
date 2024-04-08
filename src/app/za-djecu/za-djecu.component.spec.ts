import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaDjecuComponent } from './za-djecu.component';

describe('ZaDjecuComponent', () => {
  let component: ZaDjecuComponent;
  let fixture: ComponentFixture<ZaDjecuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaDjecuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZaDjecuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
