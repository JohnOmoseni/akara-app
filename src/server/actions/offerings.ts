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
				`/user/offerings/${offering_id}`,
			keepUnusedDataFor: 0,
			transformResponse: (responseData: any) => {
				return responseData;
			},
			providesTags: (_result, _error, id) => [{ type: "Offerings", id }] as any,
		}),

		// EARNINGS
	}),
	overrideExisting: false, // To avoid overwriting existing endpoints
});

export const { useGetAllOfferingsQuery, useGetOfferingByIdQuery } =
	offeringsApiSlice;
