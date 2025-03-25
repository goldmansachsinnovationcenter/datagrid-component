/**
 * Event manager module for handling grid events
 */

import { SyntheticEvent } from 'react';

export interface GridEventHandler<T = any> {
  (event: SyntheticEvent, data: T): void;
}

export interface GridEventMap {
  [eventName: string]: GridEventHandler[];
}

/**
 * Event manager class for handling grid events
 */
export class EventManager {
  private events: GridEventMap = {};

  /**
   * Subscribe to an event
   * @param eventName Name of the event to subscribe to
   * @param handler Event handler function
   * @returns Unsubscribe function
   */
  public on<T = any>(eventName: string, handler: GridEventHandler<T>): () => void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(handler as GridEventHandler);

    // Return unsubscribe function
    return () => {
      this.events[eventName] = this.events[eventName].filter(h => h !== handler);
    };
  }

  /**
   * Emit an event
   * @param eventName Name of the event to emit
   * @param event Synthetic event object
   * @param data Additional data to pass to handlers
   */
  public emit<T = any>(eventName: string, event: SyntheticEvent, data: T): void {
    const handlers = this.events[eventName];
    if (!handlers) return;

    handlers.forEach(handler => {
      handler(event, data);
    });
  }

  /**
   * Remove all event handlers
   */
  public clear(): void {
    this.events = {};
  }

  /**
   * Remove all handlers for a specific event
   * @param eventName Name of the event to clear
   */
  public clearEvent(eventName: string): void {
    if (this.events[eventName]) {
      delete this.events[eventName];
    }
  }
}

/**
 * Create a new event manager instance
 * @returns EventManager instance
 */
export const createEventManager = (): EventManager => {
  return new EventManager();
};
