/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MbMapComponent } from './mb-map.component';

describe('MbMapComponent', () => {
  let component: MbMapComponent;
  let fixture: ComponentFixture<MbMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
