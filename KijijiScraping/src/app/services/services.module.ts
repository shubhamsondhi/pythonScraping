import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MbMapService } from './mb-map.service';
import { HttpClientModule } from '@angular/common/http';
import { RentedHousesService } from './rented-houses.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [],
  declarations: [],
  providers: [MbMapService, RentedHousesService,]
})
export class ServicesModule {}
