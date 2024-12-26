import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";

export const APP_ROLES = {
  Admin: "ADMIN",
  User: "USER",
  Staff: "STAFF",
};

export type Status =
  | "Success"
  | "Approved"
  | "Verified"
  | "Not Verified"
  | "Active"
  | "Deactivated"
  | "Declined"
  | "Published"
  | "Unpublished";

export type User = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  alt_phone: string;
  status: string;
  image: string;
  otpVerified: boolean;
  role: (typeof APP_ROLES)[keyof typeof APP_ROLES];
};

export type SidebarLinksProp = {
  icon: any;
  label: string;
  href: string;
  tag?: string;
  idx?: number;
};

export type TabsPanelProp = {
  activeTab: number;
  id: string;
  idx: number;
  children: React.ReactNode;
};

export type TabsProps = {
  activeTab: number;
  changeTab: (idx: number) => void;
  tabIDs: string[];
};

export type TabProps = {
  idx: number;
  activeTab: number;
  tab: string;
  changeTab: (idx: number) => void;
  className?: string;
};

export type FilterOptionsType = {
  [key: string]: { label: string; value: string }[];
};

export type OptionType = {
  label: string;
  value: string;
};

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
