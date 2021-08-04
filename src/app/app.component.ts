import { Component, ViewChild } from '@angular/core';
import { ImgCropperConfig, ImgCropperErrorEvent, ImgCropperEvent, LyImageCropper } from './cropper/image-cropper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lyl-imagecropper';
  ready: boolean;
  scale: number;
  minScale: number;
  @ViewChild(LyImageCropper, { static: true }) cropper: LyImageCropper;
  myConfig: ImgCropperConfig = {
    width: 400, // Default `250`
    height: 400, // Default `200`
    type: 'image/png', // Or you can also use `image/jpeg`
    output: {
      width: 640,
      height: 640
    }
  };
  onCropped(e: ImgCropperEvent) {
    console.log('Cropped img: ', e);
  }

  onReady(e: ImgCropperEvent) {
    this.ready = true;
    console.log('Img ready for cropper', e);
  }

  onError(e: ImgCropperErrorEvent) {
    console.warn(`'${e.name}' is not a valid image`, e);
  }

  cropImage(){
    this.cropper.crop();
  }
}
