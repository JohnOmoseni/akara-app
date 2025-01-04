declare module "react-google-recaptcha" {
  import React from "react";

  export default class ReCAPTCHA extends React.Component<ReCAPTCHAProps, any> {
    execute(): void;
    reset(): void;
    getValue(): string | null;
  }

  export interface ReCAPTCHAProps {
    sitekey: string;
    onChange?: (token: string | null) => void;
    onExpired?: () => void;
    onErrored?: () => void;
    theme?: "light" | "dark";
    size?: "compact" | "normal" | "invisible";
    tabindex?: number;
  }
}
