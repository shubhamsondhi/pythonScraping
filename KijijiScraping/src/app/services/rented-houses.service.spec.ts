/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RentedHousesService } from './rented-houses.service';

describe('Service: RentedHouses', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RentedHousesService]
    });
  });

  it('should ...', inject([RentedHousesService], (service: RentedHousesService) => {
    expect(service).toBeTruthy();
  }));
});
