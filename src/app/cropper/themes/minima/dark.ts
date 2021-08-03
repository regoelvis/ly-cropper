import { MinimaBase } from './base';
import { color, Color } from '../../color';
import { Injectable } from '@angular/core';

const contrast = new Color(0xffffff);
const shadow = new Color(0, 0, 0, 1);

@Injectable()
export class MinimaDark extends MinimaBase {
  name = 'minima-dark';
  primary = {
    default: color(0x1DE9B6),
    contrast: new Color(0, 0, 0, 0.87)
  };
  accent = {
    default: new Color(0x9C27B0),
    contrast
  };
  warn = {
    default: new Color(0xEA404C),
    contrast
  };
  disabled = {
    default: new Color(255, 255, 255, 0.3),
    contrast: new Color(255, 255, 255, 0.5)
  };
  action = {
    default: new Color(255, 255, 255, 0.70),
    contrast: new Color(0, 0, 0, 0.87)
  };
  background = {
    default: new Color(0x212121), // secondary
    primary: {
      default: new Color(0x303030),
      shadow
    },
    secondary: new Color(0x212121),
    tertiary: new Color(65, 65, 65),
  };
  paper = {
    default: new Color(0x303030),
    shadow
  };
  hover = new Color(255, 255, 255, 0.04);
  text = {
    default: new Color(0xffffff),
    primary: new Color(0xffffff),
    secondary: new Color(255, 255, 255, 0.70),
    disabled: new Color(255, 255, 255, 0.50),
    hint: new Color(255, 255, 255, 0.50),
    dark: new Color(0x2b2b2b),
    light: new Color(0xffffff)
  };
  drawer = {
    backdrop: new Color(49, 49, 49, .6)
  };
  bar = new Color(0x212121);
  divider = new Color(255, 255, 255, 0.12);
  colorShadow = shadow;
  shadow = shadow;
}
