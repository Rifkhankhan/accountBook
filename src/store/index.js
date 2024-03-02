import { configureStore } from '@reduxjs/toolkit'
import { expanseSlice } from './ExpanseSlice'
import { receiptSlice } from './ReceiptSlice'

export const store = configureStore({
	reducer: {
		expanse: expanseSlice.reducer,
		receipt: receiptSlice.reducer
	}
})

export default store
