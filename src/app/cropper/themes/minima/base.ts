import {
  LyStyleUtils,
  Dir,
  lyl,
  StyleCollection,
  StyleTemplate
} from '../../';
import { iconButton, icon, zIndex, animations, RippleVariables } from './variables';

import { Injectable } from '@angular/core';

@Injectable()
export class MinimaBase extends LyStyleUtils {
  typography = {
    fontFamily: `'Roboto', sans-serif`,
    htmlFontSize: 16,
    fontSize: 14,
    gutterTop: 1,
    gutterBottom: .35,
    lyTyp: { } as {
      [key: string]: (() => StyleTemplate) | StyleCollection
    }
  };
  iconButton = iconButton;
  icon = icon;
  zIndex = zIndex;
  ripple = RippleVariables;
  animations = animations;
  direction = Dir.ltr;

  constructor() {
    super();
    this.typography.lyTyp = {
      display4: new StyleCollection(() => lyl `{
        font-size: ${this.pxToRem(96)}
        font-weight: 300
        letter-spacing: ${-1.5 / 96}em
      }`),
      display3: new StyleCollection(() => lyl `{
        font-size: ${this.pxToRem(60)}
        font-weight: 300
        letter-spacing: ${-0.5 / 60}em
      }`),
      display2: new StyleCollection(() => lyl `{
        font-size: ${this.pxToRem(48)}
        font-weight: 400
        letter-spacing: 0
      }`),
      display1: new StyleCollection(() => lyl `{
        font-size: ${this.pxToRem(34)}
        font-weight: 400
        letter-spacing: ${0.25 / 34}em
      }`),
      headline: new StyleCollection(() => lyl `{
        font-size: ${this.pxToRem(24)}
        font-weight: 400
        letter-spacing: 0
      }`),
      title: new StyleCollection(() => lyl `{
        font-size: ${this.pxToRem(20)}
        font-weight: 500
        letter-spacing: ${0.15 / 20}em
      }`),
      subheading: new StyleCollection(() => lyl `{
        font-size: ${this.pxToRem(16)}
        font-weight: 400
        letter-spacing: ${0.15 / 16}em
        line-height: ${this.pxToRem(24)}
      }`),
      subheading2: new StyleCollection(() => lyl `{
        font-size: ${this.pxToRem(14)}
        font-weight: 500
        letter-spacing: ${0.1 / 14}em
      }`),
      body1: new StyleCollection(() => lyl `{
        font-size: ${this.pxToRem(16)}
        font-weight: 400
        letter-spacing: ${0.5 / 16}em
      }`),
      body2: new StyleCollection(() => lyl `{
        font-size: ${this.pxToRem(14)}
        font-weight: 400
        letter-spacing: ${0.25 / 14}em
      }`),
      button: new StyleCollection(() => lyl `{
        font-size: ${this.pxToRem(14)}
        font-weight: 500
        letter-spacing: ${1.25 / 14}em
      }`),
      caption: new StyleCollection(() => lyl `{
        font-size: ${this.pxToRem(12)}
        font-weight: 400
        letter-spacing: ${0.4 / 12}em
      }`),
      overline: new StyleCollection(() => lyl `{
        font-size: ${this.pxToRem(10)}
        font-weight: 400
        letter-spacing: ${1.5 / 10}em
        text-transform: uppercase
      }`)
    };

    const { lyTyp } = this.typography;
    lyTyp.h1 = lyTyp.display4;
    lyTyp.h2 = lyTyp.display3;
    lyTyp.h3 = lyTyp.display2;
    lyTyp.h4 = lyTyp.display1;
    lyTyp.h5 = lyTyp.headline;
    lyTyp.h6 = lyTyp.title;
    lyTyp.subtitle1 = lyTyp.subheading;
    lyTyp.subtitle2 = lyTyp.subheading2;
  }
}
