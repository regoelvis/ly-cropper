import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {LyImageCropperModule} from './cropper/image-cropper'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LyImageCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
