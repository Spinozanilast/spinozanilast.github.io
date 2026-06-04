import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function addEventListeners<EventsName extends keyof HTMLElementEventMap>(
    node: HTMLElement,
    eventsNames: EventsName[],
    callback: EventListener
) {
    for (const eventName of eventsNames) {
        node.addEventListener(eventName, callback);
    }
}
