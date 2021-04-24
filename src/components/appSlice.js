import {createSlice} from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'app',
    initialState: {
        user: {
                name: 'Guest',
                id: 999,
                loadwatchlist: 'Default',
                watchlists: { Default: {id: 999,
                    arrayList: ['SPY', 'DIA']}
                } 
            },
        batchWatchlist: {SPY: {quote: {}}, DIA:{quote:{}}},
        marketOpen: true, 
        searchSymbol: '',
        stockInfo: {},
        keyData: {},
        similarStock: [],
        batchSimInfo: {},
        chartData: {working: true},
        publicList: [],
        treemap: {},
        news: {},
        candleData: {working: true}, 
    },
    reducers: {
        updateUser: (state,action) => {
            state.user = action.payload
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
        },
        updatePublicList: (state, action) => { 
            state.publicList = action.payload
        },
        updateTreemap: (state, action) => { 
            state.treemap = action.payload
        },
        updateNews: (state, action) => { 
            state.news = action.payload
        },
        updateCandleData: (state, action) => { 
            state.candleData = action.payload
        },
    }
})

const { updateUser, 
        updateSearch, 
        updateStockInfo, 
        updateKeyData, 
        updateSimilarStock, 
        updateBatchSimInfo, 
        updateBatchWatchlist,
        updateChartData,
        updatePublicList,
        updateTreemap,
        updateNews,
        updateCandleData} = slice.actions

export {updateUser, 
        updateSearch, 
        updateStockInfo, 
        updateKeyData, 
        updateSimilarStock, 
        updateBatchSimInfo, 
        updateBatchWatchlist,
        updateChartData,
        updatePublicList,
        updateTreemap,
        updateNews,
        updateCandleData}
export default slice.reducer
