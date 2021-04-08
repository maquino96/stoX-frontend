import {createSlice} from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'app',
    initialState: {
        user: 'Guest',
        searchSymbol: '',
        stockInfo: {},
        keyData: {}
    },
    reducers: {
        updateUser: (state,action) => {
            state.user = action.payload
        },
        updateSearch: (state,action) => {
            state.searchSymbol = action.payload
        },
        updateStockInfo: (state,action) => {
            state.stockInfo = action.payload
        },
        updateKeyData: (state, action) => {
            state.keyData = action.payload
        }
    }
})

const { updateUser, updateSearch, updateStockInfo, updateKeyData } = slice.actions

export {updateUser, updateSearch, updateStockInfo, updateKeyData}
export default slice.reducer
