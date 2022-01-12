import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '0e0e528eafmsh903a5951a1699aep1e8d4djsn73b49ff0f161' 
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
      
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        
    })
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery } = cryptoApi;


 

//Here a specifc api that will be used to fetch data from rapid api is being provided.

// var options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/exchanges',
//     headers: {
//       'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
//       'x-rapidapi-key': '0e0e528eafmsh903a5951a1699aep1e8d4djsn73b49ff0f161'
//     }
//   };