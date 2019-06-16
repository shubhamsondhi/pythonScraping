/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MbTableComponent } from './mb-table.component';

describe('MbTableComponent', () => {
  let component: MbTableComponent;
  let fixture: ComponentFixture<MbTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
