import {createSlice} from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'app',
    initialState: {
        user: {
                name: 'Guest',
                id: 1,
                watchlists: { default: {id: 999,
                    arrayList: ['SPY', 'DIA']}
                } 
            },
        onLoadWatchlist: 'default',
        batchWatchlist: {SPY: {quote: {}}, DIA:{quote:{}}},
        marketOpen: true, 
        searchSymbol: '',
        stockInfo: {},
        keyData: {},
        similarStock: [],
        batchSimInfo: {},
        chartData: {}
    },
    reducers: {
        updateUser: (state,action) => {
            state.user = action.payload
        },
        updateOnLoadWatchlist: (state, action) => {
            state.onLoadWatchlist = action.payload
        },
        updateBatchWatchlist: (state, action) => {
            state.batchWatchlist = action.payload
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
        },
        updateChartData: (state, action) => {
            state.chartData = action.payload
        }
    }
})

const { updateUser, 
        updateSearch, 
        updateStockInfo, 
        updateKeyData, 
        updateSimilarStock, 
        updateBatchSimInfo, 
        updateOnLoadWatchlist, 
        updateBatchWatchlist,
        updateChartData} = slice.actions

export {updateUser, 
        updateSearch, 
        updateStockInfo, 
        updateKeyData, 
        updateSimilarStock, 
        updateBatchSimInfo, 
        updateOnLoadWatchlist,
        updateBatchWatchlist,
        updateChartData}
export default slice.reducer
