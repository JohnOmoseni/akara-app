// AUTH
export interface RegisterUserParams {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
  recaptcha?: string | null;
}
