import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice ({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
        return action.payload
        },
        // eslint-disable-next-line no-unused-vars
        clearNotification(state, action) {
            return '';
        }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const changeNotification = (notificationText, timeout) => {
    return async dispatch => {
        dispatch(setNotification(notificationText))
        setTimeout(() => {dispatch(clearNotification())}, timeout * 1000)
    }


}

export default notificationSlice.reducer