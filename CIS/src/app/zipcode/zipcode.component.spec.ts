import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipcodeComponent } from './zipcode.component';

describe('ZipcodeComponent', () => {
  let component: ZipcodeComponent;
  let fixture: ComponentFixture<ZipcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZipcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
