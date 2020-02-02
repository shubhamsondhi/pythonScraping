import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../Shared/shared.module';
import { UrlValidatorDirective } from '../Shared/url-validator.directive';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        MatProgressBarModule,
        MatButtonModule,
        BrowserAnimationsModule,
        SharedModule,
    ],
    exports: [HomeComponent, UrlValidatorDirective],
    declarations: [HomeComponent],
})
export class ComponentsModule {}