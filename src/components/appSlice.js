import {createSlice} from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'app',
    initialState: {
        user: 'Guest',
        searchSymbol: '',
        stockInfo: {},
        keyData: {},
        similarStock: [],
        batchSimInfo: {}
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
        },
        updateSimilarStock: (state, action) => {
            state.similarStock = action.payload
        },
        updateBatchSimInfo: (state, action) => {
            state.batchSimInfo = action.payload
        }
    }
})

const { updateUser, updateSearch, updateStockInfo, updateKeyData, updateSimilarStock, updateBatchSimInfo } = slice.actions

export {updateUser, updateSearch, updateStockInfo, updateKeyData, updateSimilarStock, updateBatchSimInfo }
export default slice.reducer
