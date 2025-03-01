import api from "../api";

export const offeringsApiSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		// OFFERINGS
		getAllOfferings: builder.query({
			query: () => `/user/offerings`,
			keepUnusedDataFor: 0,
			transformResponse: (responseData: any) => {
				return responseData?.data;
			},
		}),

		getOfferingById: builder.query({
			query: ({ offering_id }: { offering_id: string }) =>
				`/offerings/${offering_id}`,
			keepUnusedDataFor: 0,
			transformResponse: (responseData: any) => {
				return responseData?.data;
			},
			providesTags: (_result, _error, id) => [{ type: "Offerings", id }] as any,
		}),

		// EARNINGS

		getAllEarnings: builder.query({
			query: () => `/user/earnings`,
			keepUnusedDataFor: 0,
			transformResponse: (responseData: any) => {
				return responseData?.data;
			},
		}),

		getEarningById: builder.query({
			query: ({ earning_id }: { earning_id: string }) =>
				`/user/earnings/${earning_id}`,
			keepUnusedDataFor: 0,
			transformResponse: (responseData: any) => {
				return responseData;
			},
			providesTags: (_result, _error, id) => [{ type: "Earnings", id }] as any,
		}),
	}),
	overrideExisting: false, // To avoid overwriting existing endpoints
});

export const {
	useGetAllOfferingsQuery,
	useGetOfferingByIdQuery,
	useGetAllEarningsQuery,
	useGetEarningByIdQuery,
} = offeringsApiSlice;
