import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDclgBQXkQToljjhdRhmJH-vYIlIl3JuWY'
      /* apiKey is required, unless you are a
      premium customer, in which case you can
      use clientId
      */
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
