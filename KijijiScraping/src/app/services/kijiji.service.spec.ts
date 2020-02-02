/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KijijiService } from './kijiji.service';

describe('Service: Kijiji', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KijijiService]
    });
  });

  it('should ...', inject([KijijiService], (service: KijijiService) => {
    expect(service).toBeTruthy();
  }));
});
