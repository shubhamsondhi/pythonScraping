import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatProgressBarModule, MatButtonModule } from '@angular/material';
// import { UrlValidatorDirective } from './Shared/url-validator.directive';
// import { SharedModule } from './Shared/shared.module';
import { MbMapService } from './services/mb-map.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ComponentsModule } from './components/components.module';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SharedModule } from './Shared/shared.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [AppComponent],
    imports: [
        FormsModule,
        BrowserModule,
        ComponentsModule,
        MatInputModule,
        MatSelectModule,
        MatSidenavModule,
        MatIconModule,
        SharedModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatDividerModule,
        MatAutocompleteModule
    ],
    providers: [MbMapService],
    bootstrap: [AppComponent],
})
export class AppModule {}
// AIzaSyC3u1VAIs0S5Ij-HmcxrTEMIx19X8UZH30
