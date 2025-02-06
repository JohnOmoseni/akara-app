self.addEventListener("push", function (event) {
	const options = {
		body: event.data.text(),
		icon: "/icon.png", // Add your notification icon path
		badge: "/badge.png", // Add your badge icon path
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: "2",
		},
	};

	event.waitUntil(
		self.registration.showNotification("Akara Notification", options)
	);
});

self.addEventListener("notificationclick", function (event) {
	event.notification.close();
	event.waitUntil(clients.openWindow("/notifications"));
});
