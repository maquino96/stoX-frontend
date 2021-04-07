import {createSlice} from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'app',
    initialState: {
        user: 'Guest',
        searchSymbol: 'TEST',
        stockInfo: { name: 'MaxistheGOAT',
                    age: 24}
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
        }
    }
})

const { updateUser, updateSearch, updateStockInfo } = slice.actions

export {updateUser, updateSearch, updateStockInfo}
export default slice.reducer
