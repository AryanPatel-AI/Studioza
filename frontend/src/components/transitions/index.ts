/**
 * Transition Component Exports
 * Manages museum gallery room routing, View Transitions API integration, and shutter wipes.
 */
export {
  AtelierTransitionProvider,
  useAtelierTransition,
} from "./AtelierTransitionContext";

export { default as AtelierTransitionOverlay } from "./AtelierTransitionOverlay";
export type { AtelierTransitionOverlayProps } from "./AtelierTransitionOverlay";

export { ATELIER_ROOMS, getRoomInfo } from "./rooms";
export type { RoomInfo } from "./rooms";
