import { Instagram, Twitter, Whatsapp } from "./icons";
import { Bell, Home, User } from "lucide-react";

export const routes = {
  ROOT: "/",
  LOGIN: "/signin",
  SIGNUP: "/signup",
  VERIFY_OTP: "/verify-otp",
  UNAUTH: "/unauthorized",
  DASHBOARD: "/dashboard",
  ADMIN_ROUTES: [""],
};

export const socials = [
  {
    label: Instagram,
    href: "https://www.instagram.com/luxury.with.lan/profilecard/?igsh=MTh4MWl2d25hamZmMQ==",
    tag: "instagram",
  },
  {
    label: Twitter,
    href: "https://www.twitter.com/@luxurywithlan",
    tag: "facebook",
  },
  {
    label: Whatsapp,
    href: "https://wa.me/+2348074764296?text=Hello%20there!",
    tag: "chat",
  },
];

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

export const privacyPolicy = [
  {
    introduction:
      "LuxuryWithLan values the privacy of its users. This Privacy Policy describes how we collect, use, and protect the personal information of users who interact with our app, website, and services. \n By using our platform, you agree to the practices outlined in this Privacy Policy.",
  },
  {
    label: "Information we collect",
    body: "Personal Information: When you register or use our app, we may collect personal information such as your name, email address, phone number, location, payment details, and any other information you provide during registration or transactions.\n \n  Property Listings Information: If you list a property, car, apartment, or hotel, we may collect details such as the property type, address, photos, price, and other relevant information. \n \n Usage Data: We may collect information about how you use the app, such as device information, IP address, browser type, browsing history, search queries, and the features you use. \n \n  Location Data: We may collect your device's location to provide location-based services (e.g., nearby properties or listings.",
  },
  {
    label: "How we use Information",
    body: "We use the collected information for the following purposes: \n \n To provide, improve, and personalize our services. \n \n To process transactions, manage listings, and facilitate communication between buyers and sellers. \n \n  To send marketing and promotional communications (if you have opted in). \n \n  To improve the functionality of the app and monitor usage patterns. \n \n  To comply with legal obligations, resolve disputes, and enforce our agreements.",
  },
  {
    label: "Sharing Your Information",
    body: "We may share your information with third parties in the following circumstances: \n \n Service Providers: We may share your information with trusted third-party service providers who assist with operations such as payment processing, hosting, and marketing. \n \n Legal Requirements: We may disclose your information if required to do so by law, regulation, legal process, or governmental request. \n \n Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.",
  },
  {
    label: "Data Security",
    body: "We take reasonable steps to protect your personal data from unauthorized access, loss, or misuse. \n However, no method of data transmission over the internet or method of electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.",
  },

  {
    label: "User Rights and Control",
    body: "As a user, you have the following rights: \n \n Access: YYou may access, review, and update your personal information through your account settings. \n \n Opt-Out: You may opt-out of receiving marketing communications by following the unsubscribe instructions in any communication or adjusting your notification preferences in the app. \n \n Data Deletion: You may request the deletion of your account and personal information, subject to applicable legal obligations and retention periods.",
  },

  {
    label: "Cookies and Tracking Technologies",
    body: "We use cookies and other tracking technologies to enhance your user experience. You can disable cookies through your browser settings, but this may affect your ability to use certain features of the app.",
  },
  {
    label: "Third-Party Links",
    body: "Our app may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any personal information.",
  },
  {
    label: "Changes to this Privacy Policy",
    body: 'We reserve the right to update or modify this Privacy Policy at any time. When we make changes, we will update the "Effective Date" at the top of this page. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.',
  },
  {
    label: "Contact Us",
    body: "If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at: skymeasure@gmail.com",
  },
];

export const sidebarLinks = [
  {
    icon: "",
    label: "Help",
    href: "/help",
    tag: "help",
  },
  {
    icon: "",
    label: "Resources",
    href: "/resources",
    tag: "resources",
  },

  {
    icon: "",
    label: "Refer & Earn",
    href: "/refer-and-earn",
    tag: "refer-and-earn",
  },
  {
    icon: "",
    label: "Settings",
    href: "/settings",
    tag: "settings",
  },
  {
    icon: "",
    label: "Logout",
    href: "/logout",
    tag: "logout",
  },
];
