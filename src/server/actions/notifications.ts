import api from "../api";

export const offeringsApiSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		// OFFERINGS
		getAllNotifications: builder.query<
			any,
			{ page?: number; limit?: number } | void
		>({
			query: () => `/user/notifications`,
			// keepUnusedDataFor: 0,
			transformResponse: (responseData: any) => {
				return responseData;
			},
		}),
	}),
	overrideExisting: false, // To avoid overwriting existing endpoints
});

export const { useGetAllNotificationsQuery } = offeringsApiSlice;
