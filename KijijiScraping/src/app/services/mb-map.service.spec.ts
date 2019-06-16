/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MbMapService } from './mb-map.service';

describe('Service: MbMap', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MbMapService]
    });
  });

  it('should ...', inject([MbMapService], (service: MbMapService) => {
    expect(service).toBeTruthy();
  }));
});
