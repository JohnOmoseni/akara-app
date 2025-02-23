import api from "../api";

export const notificationApiSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		// OFFERINGS
		getAllNotifications: builder.query<
			any,
			{ page?: number; limit?: number } | void
		>({
			query: () => `/user/notifications`,
			// keepUnusedDataFor: 0,
			transformResponse: (responseData: any) => {
				return responseData?.notifications;
			},
		}),

		markAsRead: builder.query<any, { notification_id: string }>({
			query: ({ notification_id }) =>
				`/user/notifications/${notification_id}/mark-as-read`,
			transformResponse: (responseData: any) => {
				return responseData;
			},
		}),
	}),
	overrideExisting: false, // To avoid overwriting existing endpoints
});

export const { useGetAllNotificationsQuery } = notificationApiSlice;
