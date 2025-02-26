import {
	Bell,
	Help,
	Home,
	Logout,
	Refer,
	Resources,
	Settings,
	User,
} from "./icons";
// import { Bell, Home, User } from "lucide-react";

export const routes = {
	ROOT: "/",
	LOGIN: "/signin",
	SIGNUP: "/signup",
	VERIFY_OTP: "/verify-otp",
	UNAUTH: "/unauthorized",
	DASHBOARD: "/dashboard",
};

export const footerTabs = [
	{
		icon: User as any,
		label: "Profile",
		value: "profile",
		href: "/profile",
	},
	{
		icon: Home as any,
		label: "Home",
		value: "home",
		href: "/",
	},
	{
		icon: Bell,
		label: "Notification",
		value: "notifications",
		href: "/notifications",
	},
];

export const sidebarLinks = [
	{
		icon: Help,
		label: "Help",
		href: "/help",
		tag: "help",
	},
	{
		icon: Resources,
		label: "Resources",
		href: "/resources",
		tag: "resources",
	},

	{
		icon: Refer,
		label: "Refer & Earn",
		href: "/refer-and-earn",
		tag: "refer-and-earn",
	},
	{
		icon: Settings,
		label: "Settings",
		href: "/settings",
		tag: "settings",
	},
	{
		icon: Logout,
		label: "Logout",
		tag: "logout",
	},
];
