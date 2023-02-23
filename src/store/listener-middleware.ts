import { createListenerMiddleware } from '@reduxjs/toolkit'

const listener = createListenerMiddleware()

export const { startListening, stopListening } = listener
export const listenerMiddleware = listener.middleware
