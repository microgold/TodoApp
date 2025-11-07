import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

/**
 * Use throughout your app instead of plain `useDispatch` and `useSelector`.
 * These are fully typed based on your store.
 */

// Typed version of useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// Typed version of useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
