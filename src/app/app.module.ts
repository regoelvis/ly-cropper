import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LyTheme2, LY_THEME, LY_THEME_NAME, StyleRenderer } from './cropper';
import {LyImageCropperModule} from './cropper/image-cropper'
import { MinimaLight } from './cropper/themes/minima';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LyImageCropperModule
  ],
  providers: [
    [ LyTheme2 ],
    [ StyleRenderer ],
    // Theme that will be applied to this module
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    { provide: LY_THEME, useClass: MinimaLight, multi: true }, // name: `minima-light`
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
