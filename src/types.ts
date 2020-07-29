export interface MouseTouchLocation {
  x: number;
  y: number;
}

export type EventHandler<T> = (e: T) => void | false;

export interface LGLDomEvent<T> extends Event {
  detail: T;
}

export interface DraggingEvent {
  deltaX: number;
  deltaY: number;
}
