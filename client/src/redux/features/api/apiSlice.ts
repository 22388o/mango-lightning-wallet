import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";
const qrCode = require('qrcode');

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_BASE_URL!}`,
    prepareHeaders: (headers, { getState }) => {
      headers.set("X-Token", `${(getState() as RootState).auth.token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    connect: builder.mutation<
      { token: string },
      { host: string; cert: string; macaroon: string }
    >({
      query: (data) => ({
        url: "/connect",
        method: "POST",
        body: data,
      }),
    }),
    getInfo: builder.query<{ alias: string; balance: number }, void>({
      query: () => "/info",
    }),
    getInvoice: builder.mutation< { paymentRequest: string, svg: string }, void >({
    query: (data) => ({
      url: "/get-invoice",
      method: "POST",
      body: data,
    }),
    transformResponse: ({ paymentRequest }: { paymentRequest: string }) => {
      let svg = ''
      qrCode.toString(paymentRequest, {
        errorCorrectionLevel: 'H',
        type: 'svg'
      }, function(err: any, data: string) {
        if (err) throw err;
        svg = data
      });
      return { paymentRequest, svg }
    },
  }),
  }),
});

export const { useConnectMutation, useGetInfoQuery, useGetInvoiceMutation } = apiSlice;
