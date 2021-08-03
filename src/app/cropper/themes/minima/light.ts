import { ThemeConfig} from '../../';
import { Color } from '../../color';
import { MinimaBase } from './base';
import { Injectable } from '@angular/core';

const contrast = new Color(0xffffff);
const shadow = new Color(0x333333);
@Injectable()
export class MinimaLight extends MinimaBase implements ThemeConfig {
  name = 'minima-light';
  primary = {
    default: new Color(0x6200EE),
    contrast
  };
  accent = {
    default: new Color(0xFF2997),
    contrast,
  };
  warn = {
    default: new Color(0xf5414e),
    contrast
  };
  action = {
    default: new Color(0, 0, 0, .6),
    contrast: new Color(0xffffff)
  };
  background = {
    default: new Color(0xfafafa), // secondary
    primary: {
      default: new Color(0xffffff),
      shadow
    },
    secondary: new Color(0xfafafa),
    tertiary: new Color(0xefefef),
  };
  hover = new Color(0, 0, 0, 0.04);
  paper = {
    default: new Color(0xffffff),
    shadow
  };
  disabled = {
    default: new Color(0, 0, 0, 0.12),
    contrast: new Color(0, 0, 0, 0.26)
  };
  text = {
    default: new Color(0, 0, 0, 0.87),
    primary: new Color(0, 0, 0, 0.87),
    secondary: new Color(0, 0, 0, 0.54),
    disabled: new Color(0, 0, 0, 0.26),
    hint: new Color(0, 0, 0, 0.38),
    dark: new Color(0, 0, 0, 0.87),
    light: new Color(0xffffff)
  };
  divider = new Color(0, 0, 0, 0.12);
  colorShadow = new Color(0x333333);
  shadow = new Color(0x333333);
  drawer = {
    backdrop: new Color(0, 0, 0, .6)
  };
  bar = new Color(0xf5f5f5);
}