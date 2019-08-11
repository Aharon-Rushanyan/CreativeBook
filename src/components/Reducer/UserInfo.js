import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from '../../App';
import React from 'react'

const initialState = {
}

function initUser(state = initialState, action) {
    if (action.type === 'SIGN-IN') {
        return ({
            ...state,
            userName: action.userSign.user.displayName,
            userId: action.userSign.user.uid,
            photoUrl: action.userSign.user.photoURL,
        })
    }
}

const store = createStore(initUser)

store.subscribe(() => console.log(store.getState()));

function Users() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export default Users