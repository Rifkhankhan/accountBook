import { configureStore } from '@reduxjs/toolkit'
import { expanseSlice } from './ExpanseSlice'
import { receiptSlice } from './ReceiptSlice'
import { userSlice } from './UserSlice'
import { authSlice } from './AuthSlice'
import { advanceSlice } from './AdvanceSlice'
import { loanSlice } from './LoanSlice'
import { accountRequestSlice } from './AccountRequestSlice'

export const store = configureStore({
	reducer: {
		expanse: expanseSlice.reducer,
		receipt: receiptSlice.reducer,
		user: userSlice.reducer,
		advance: advanceSlice.reducer,
		loan: loanSlice.reducer,
		auth: authSlice.reducer,
		accountRequest: accountRequestSlice.reducer
	}
})

export default store
