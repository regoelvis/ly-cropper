import { Component, ElementRef, NgZone, Input, OnDestroy, ChangeDetectionStrategy, Inject, ViewChild } from '@angular/core';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { LyImageCropper } from './image-cropper';
import { DOCUMENT } from '@angular/common';

const activeEventOptions = normalizePassiveListenerOptions({passive: false});

/**
 * @dynamic
 */
@Component({
  selector: 'ly-cropper-area',
  templateUrl: './image-cropper-area.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'lyCropperArea'
})
export class LyCropperArea implements  OnDestroy {

  private _isSliding: boolean;
  /** Keeps track of the last pointer event that was captured by the crop area. */
  private _lastPointerEvent: MouseEvent | TouchEvent | null;
  private _startPointerEvent: {
    x: number
    y: number
  } | null;
  private _currentWidth: number;
  private _currentHeight: number;
  private _startAreaRect: DOMRect;
  private _startImgRect: DOMRect;

  /** Used to subscribe to global move and end events */
  protected _document: Document;

  @ViewChild('resizer') readonly _resizer?: ElementRef;

  @Input()
  set resizableArea(val: boolean) {
    if (val !== this._resizableArea) {
      this._resizableArea = val;
      Promise.resolve(null).then(() => {
        if (val) {
          this._removeResizableArea();
          this._addResizableArea();
        } else {
          this._removeResizableArea();
        }
      });
    }
  }
  get resizableArea() {
    return this._resizableArea;
  }
  private _resizableArea: boolean;
  @Input() keepAspectRatio: boolean;

  constructor(
    readonly _elementRef: ElementRef,
    private _ngZone: NgZone,
    readonly _cropper: LyImageCropper,
    @Inject(DOCUMENT) _document: any,
  ) {
    this._document = _document;
  }

  ngOnDestroy() {
    this._removeResizableArea();
  }

  private _addResizableArea() {
    this._ngZone.runOutsideAngular(() => {
      const element = this._resizer!.nativeElement;
      element.addEventListener('mousedown', this._pointerDown, activeEventOptions);
      element.addEventListener('touchstart', this._pointerDown, activeEventOptions);
    });
  }

  private _removeResizableArea() {
    const element = this._resizer?.nativeElement;
    if (element) {
      this._lastPointerEvent = null;
      this._removeGlobalEvents();
      element.removeEventListener('mousedown', this._pointerDown, activeEventOptions);
      element.removeEventListener('touchstart', this._pointerDown, activeEventOptions);
    }
  }

  private _pointerDown = (event: MouseEvent | TouchEvent) => {
    // Don't do anything if the
    // user is using anything other than the main mouse button.
    if (this._isSliding || (!isTouchEvent(event) && event.button !== 0)) {
      return;
    }

    event.preventDefault();

    this._ngZone.run(() => {
      this._isSliding = true;
      this._lastPointerEvent = event;
      this._startPointerEvent = getGesturePointFromEvent(event);
      this._startAreaRect = this._cropper._areaCropperRect();
      this._startImgRect = this._cropper._canvasRect();
      event.preventDefault();
      this._bindGlobalEvents(event);
    });

  }

  private _pointerMove = (event: MouseEvent | TouchEvent) => {
    if (this._isSliding) {
      event.preventDefault();
      this._lastPointerEvent = event;
      const element: HTMLDivElement = this._elementRef.nativeElement;
      const { width, height, minWidth, minHeight } = this._cropper.config;
      const point = getGesturePointFromEvent(event);
      const deltaX = point.x - this._startPointerEvent!.x;
      const deltaY = point.y - this._startPointerEvent!.y;
      const startAreaRect = this._startAreaRect;
      const startImgRect = this._startImgRect;
      const keepAspectRatio = this._cropper.config.keepAspectRatio || event.shiftKey;
      let newWidth = 0;
      let newHeight = 0;
      const rootRect = this._cropper._rootRect();

     if (keepAspectRatio) {
        newWidth = width + deltaX * 2;
        newHeight = height + deltaY * 2;
        if (width !== height) {
          if (width > height) {
            newHeight = height / (width / newWidth);
          } else if (height > width) {
            newWidth = width / (height / newHeight);
          }
        } else {
          newWidth = newHeight = Math.max(newWidth, newHeight);
        }
      } else {
        newWidth = width + deltaX * 2;
        newHeight = height + deltaY * 2;
      }

      // To min width
      if (newWidth < minWidth!) {
        newWidth = minWidth!;
      }
      // To min height
      if (newHeight < minHeight!) {
        newHeight = minHeight!;
      }

      // Do not overflow the cropper area
      const centerX = startAreaRect.x + startAreaRect.width / 2;
      const centerY = startAreaRect.y + startAreaRect.height / 2;
      const topOverflow = startImgRect.y > centerY - (newHeight / 2);
      const bottomOverflow = centerY + (newHeight / 2) > startImgRect.bottom;
      const minHeightOnOverflow = Math.min((centerY - startImgRect.y) * 2, (startImgRect.bottom - centerY) * 2);
      const leftOverflow = startImgRect.x > centerX - (newWidth / 2);
      const rightOverflow = centerX + (newWidth / 2) > startImgRect.right;
      const minWidthOnOverflow = Math.min((centerX - startImgRect.x) * 2, (startImgRect.right - centerX) * 2);
      
      if (keepAspectRatio) {
        const newNewWidth: number[] = [];
        const newNewHeight: number[] = [];
        if ((topOverflow || bottomOverflow) && Math.min()) {
          newHeight = minHeightOnOverflow;
          newNewHeight.push(newHeight);
          newWidth = width / (height / minHeightOnOverflow);
          newNewWidth.push(newWidth);
        }
        if ((leftOverflow || rightOverflow)) {
          newWidth = minWidthOnOverflow;
          newNewWidth.push(newWidth);
          newHeight = height / (width / minWidthOnOverflow);
          newNewHeight.push(newHeight);
        }
        if (newNewWidth.length === 2) {
          newWidth = Math.min(...newNewWidth);
        }
        if (newNewHeight.length === 2) {
          newHeight = Math.min(...newNewHeight);
        }
      } else {
        if (topOverflow || bottomOverflow) {
          newHeight = minHeightOnOverflow;
        }
        if (leftOverflow || rightOverflow) {
          newWidth = minWidthOnOverflow;
        }
      }

      // Do not overflow the container
      if (keepAspectRatio) {
        if (newWidth > rootRect.width) {
          newWidth = rootRect.width;
          newHeight = height / (width / rootRect.width);
        } else if (newHeight > rootRect.height) {
          newWidth = width / (height / rootRect.height);
          newHeight = rootRect.height;
        }
      } else {
        if (newWidth > rootRect.width) {
          newWidth = rootRect.width;
        } else if (newHeight > rootRect.height) {
          newHeight = rootRect.height;
        }
      }

      // round values
      newWidth = Math.round(newWidth);
      newHeight = Math.round(newHeight);

      element.style.width = `${newWidth}px`;
      element.style.height = `${newHeight}px`;
      this._currentWidth = newWidth;
      this._currentHeight = newHeight;
    }
  }

  /** Called when the user has lifted their pointer. */
  private _pointerUp = (event: TouchEvent | MouseEvent) => {
    if (this._isSliding) {
      event.preventDefault();
      this._removeGlobalEvents();
      this._cropper._primaryAreaWidth = this._cropper.config.width = this._currentWidth;
      this._cropper._primaryAreaHeight = this._cropper.config.height = this._currentHeight;
      this._cropper._updateMinScale();
      this._isSliding = false;
      this._startPointerEvent = null;
    }
  }

  /** Called when the window has lost focus. */
  private _windowBlur = () => {
    // If the window is blurred while dragging we need to stop dragging because the
    // browser won't dispatch the `mouseup` and `touchend` events anymore.
    if (this._lastPointerEvent) {
      this._pointerUp(this._lastPointerEvent);
    }
  }

  private _bindGlobalEvents(triggerEvent: TouchEvent | MouseEvent) {
    const element = this._document;
    const isTouch = isTouchEvent(triggerEvent);
    const moveEventName = isTouch ? 'touchmove' : 'mousemove';
    const endEventName = isTouch ? 'touchend' : 'mouseup';
    element.addEventListener(moveEventName, this._pointerMove, activeEventOptions);
    element.addEventListener(endEventName, this._pointerUp, activeEventOptions);

    if (isTouch) {
      element.addEventListener('touchcancel', this._pointerUp, activeEventOptions);
    }

    const window = this._getWindow();

    if (typeof window !== 'undefined' && window) {
      window.addEventListener('blur', this._windowBlur);
    }
  }

  /** Removes any global event listeners that we may have added. */
  private _removeGlobalEvents() {
    const element = this._document;
    element.removeEventListener('mousemove', this._pointerMove, activeEventOptions);
    element.removeEventListener('mouseup', this._pointerUp, activeEventOptions);
    element.removeEventListener('touchmove', this._pointerMove, activeEventOptions);
    element.removeEventListener('touchend', this._pointerUp, activeEventOptions);
    element.removeEventListener('touchcancel', this._pointerUp, activeEventOptions);

    const window = this._getWindow();

    if (typeof window !== 'undefined' && window) {
      window.removeEventListener('blur', this._windowBlur);
    }
  }

  /** Use defaultView of injected document if available or fallback to global window reference */
  private _getWindow(): Window {
    return this._document.defaultView || window;
  }
}

function getGesturePointFromEvent(event: TouchEvent | MouseEvent) {

  // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
  const point = isTouchEvent(event)
    ? (event.touches[0] || event.changedTouches[0])
    : event;

  return {
    x: point.clientX,
    y: point.clientY
  };
}

/** Returns whether an event is a touch event. */
function isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
  return event.type[0] === 't';
}
