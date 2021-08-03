import { NgModule } from '@angular/core';
import { MediaDirective } from './media.directive';
import { LyCommonModule } from '../';

/**
 * @deprecated use instead `[lyDisplay]` or `[lyStyle]`
 */
@NgModule({
  declarations: [MediaDirective],
  exports: [MediaDirective, LyCommonModule],
})
export class ResponsiveModule { }
