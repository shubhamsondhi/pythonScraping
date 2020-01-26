import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule, MatButtonModule } from '@angular/material';
import { UrlValidatorDirective } from './Shared/url-validator.directive';
import { SharedModule } from './Shared/shared.module';
import { MbMapService } from './services/mb-map.service';
import { ComponentsModule } from './components/components.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    ComponentsModule
  ],
  providers: [MbMapService],
  bootstrap: [AppComponent]
})
export class AppModule {}
// AIzaSyC3u1VAIs0S5Ij-HmcxrTEMIx19X8UZH30
