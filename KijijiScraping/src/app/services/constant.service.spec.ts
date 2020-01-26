/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConstantService } from './constant.service';

describe('Service: Constant', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConstantService]
    });
  });

  it('should ...', inject([ConstantService], (service: ConstantService) => {
    expect(service).toBeTruthy();
  }));
});
