import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MbMapComponent } from './mb-map/mb-map.component';
import { MbTableComponent } from './mb-table/mb-table.component';
import { UrlValidatorDirective } from './url-validator.directive';
import { AgmCoreModule } from '@agm/core';
import { Ng5SliderModule } from 'ng5-slider';
import { ServicesModule } from '../services/services.module';

@NgModule({
  imports: [ServicesModule,
    CommonModule,
    Ng5SliderModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
      apiKey: 'AIzaSyC3u1VAIs0S5Ij-HmcxrTEMIx19X8UZH30'
      /* apiKey is required, unless you are a
      premium customer, in which case you can
      use clientId
      */
    })
  ],
  exports: [UrlValidatorDirective, MbMapComponent],
  declarations: [MbMapComponent, MbTableComponent, UrlValidatorDirective],
  providers: []
})
export class SharedModule {}
