import {
  customElement,
  html,
  LitElement,
  TemplateResult,
  property,
  CSSResult,
  css,
} from "lit-element";

import { fireEvent } from "./util/fire-event";
import { getMouseTouchLocation } from "./util/get-mouse-touch-location";
import { getTouchIdentifier } from "./util/get-touch-identifier";

@customElement("lit-draggable")
export class LitDraggable extends LitElement {
  @property({ type: Array }) public grid?: [number, number];

  @property({ type: Boolean, reflect: true }) public disabled = false;

  private startX?: number;

  private startY?: number;

  private _dragging = false;

  private _touchIdentifier?: number;

  protected firstUpdated(): void {
    this.addEventListener("mousedown", this._dragStart.bind(this), {
      capture: true,
      passive: false,
    });
    this.addEventListener("touchstart", this._dragStart.bind(this), {
      capture: true,
      passive: false,
    });
    document.addEventListener("mousemove", this._drag.bind(this), {
      capture: true,
      passive: false,
    });
    document.addEventListener("touchmove", this._drag.bind(this), {
      capture: true,
      passive: false,
    });
    document.addEventListener("mouseup", this._dragEnd.bind(this), {
      capture: true,
      passive: false,
    });
    document.addEventListener("touchcancel", this._dragEnd.bind(this), {
      capture: true,
      passive: false,
    });
    document.addEventListener("touchend", this._dragEnd.bind(this), {
      capture: true,
      passive: false,
    });
  }

  protected render(): TemplateResult {
    return html`<slot></slot>`;
  }

  private _dragStart(ev: MouseEvent | TouchEvent): void {
    if (ev.type.startsWith("mouse") && (ev as MouseEvent).button !== 0) {
      return;
    }

    if (this.disabled) {
      return;
    }

    ev.stopPropagation();

    if (ev.type === "touchstart") {
      ev.preventDefault();

      this._touchIdentifier = getTouchIdentifier(ev as TouchEvent);
    }

    const pos = getMouseTouchLocation(ev, this._touchIdentifier);

    if (!pos) {
      return;
    }

    this.startX = pos.x;
    this.startY = pos.y;

    this._dragging = true;

    fireEvent(this, "dragStart", {
      startX: this.startX,
      startY: this.startY,
    });
  }

  private _drag(ev: MouseEvent | TouchEvent): void {
    if (!this._dragging || this.disabled) {
      return;
    }

    ev.stopPropagation();
    if (ev.type === "touchmove") {
      ev.preventDefault();
    }

    const pos = getMouseTouchLocation(ev, this._touchIdentifier);

    if (!pos) {
      return;
    }

    let deltaX = pos.x - this.startX!;
    let deltaY = pos.y - this.startY!;

    if (this.grid) {
      deltaX = Math.round(deltaX / this.grid[0]) * this.grid[0];
      deltaY = Math.round(deltaY / this.grid[1]) * this.grid[1];
    }

    if (!deltaX && !deltaY) {
      return;
    }

    fireEvent(this, "dragging", {
      deltaX,
      deltaY,
    });
  }

  private _dragEnd(ev: MouseEvent | TouchEvent): void {
    if (!this._dragging || this.disabled) {
      return;
    }

    ev.stopPropagation();
    if (ev.type === "touchend") {
      ev.preventDefault();
    }

    this._touchIdentifier = undefined;
    this._dragging = false;

    fireEvent(this, "dragEnd");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lit-draggable": LitDraggable;
  }
}
