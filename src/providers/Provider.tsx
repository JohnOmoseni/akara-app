import store from "@/redux/store";
import { Provider } from "react-redux";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function ProviderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  return <Provider store={store}>
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}>
  {children}
    </GoogleReCaptchaProvider>
  </Provider>;
}
