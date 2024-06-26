//Redux
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
//Types
import type { RootState, AppDispatch } from './store';

//Redux Toolkit Hooks - Formatted for TS.
// Use throughout your app instead of plain `useDispatch` and `useSelector`

//Dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
//Selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
