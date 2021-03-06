import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MbMapComponent } from './mb-map/mb-map.component';
import { MbTableComponent } from './mb-table/mb-table.component';
import { UrlValidatorDirective } from './url-validator.directive';
import { AgmCoreModule } from '@agm/core';
import { Ng5SliderModule } from 'ng5-slider';
import { ServicesModule } from '../services/services.module';
import {
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    MatProgressBarModule,
    MatIconModule,
    MatDividerModule,
} from '@angular/material';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from '../services/notification.service';
import { SharedService } from './Shared.service';
@NgModule({
    imports: [
        ServicesModule,
        MatCardModule,
        CommonModule,
        Ng5SliderModule,
        MatExpansionModule,
        MatGridListModule,
        MatDividerModule,
        MatProgressBarModule,
        MatIconModule,
        AgmCoreModule.forRoot({
            // apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
            apiKey: 'AIzaSyArew2eZn1_SdNAQhLWU1Sjs5jQYWmptMA',
            /* apiKey is required, unless you are a
      premium customer, in which case you can
      use clientId
      */
        }),
    ],
    exports: [UrlValidatorDirective, MbMapComponent, NotificationComponent],
    declarations: [
        MbMapComponent,
        MbTableComponent,
        NotificationComponent,
        UrlValidatorDirective,
    ],
    providers: [NotificationService, SharedService],
})
export class SharedModule {}
