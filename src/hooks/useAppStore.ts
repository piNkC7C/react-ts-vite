import { useSelector, useDispatch } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { IRootState } from '@/redux'
import type { ThunkDispatch, Action } from '@reduxjs/toolkit'

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch: () => ThunkDispatch<any, undefined, Action> = useDispatch
