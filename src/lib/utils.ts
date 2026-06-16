import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* Utility types */
export type Position = "top" | "bottom" | "left" | "right";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Adds event listeners to a node for multiple events
 *
 * @param node The node to add event listeners to
 * @param eventsNames The names of the events to listen for
 * @param callback The callback function to execute when an event is triggered
 */
export function addEventListeners<EventsName extends keyof HTMLElementEventMap>(
  node: HTMLElement,
  eventsNames: EventsName[],
  callback: EventListener,
) {
  for (const eventName of eventsNames) {
    node.addEventListener(eventName, callback);
  }
}

/**
 * Utility function to change the hide state of an element
 *
 * @param elementId The ID of the element to toggle
 * @param hide Whether to hide or show the element
 */
export function changeElementHideState(elementId: string, hide: boolean) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle("hidden", hide);
  }
}
