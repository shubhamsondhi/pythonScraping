import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../Shared/shared.module';
import { UrlValidatorDirective } from '../Shared/url-validator.directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        MatProgressBarModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatIconModule,
        BrowserAnimationsModule,
        SharedModule,
        MatMenuModule,
    ],
    exports: [HomeComponent, UrlValidatorDirective],
    declarations: [HomeComponent],
})
export class ComponentsModule {}
