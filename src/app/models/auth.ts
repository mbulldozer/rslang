interface RegistrationType {
  name: string;
  email: string;
  password: string;
}

interface ResponseLogin {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

interface RefreshToken {
  token: string;
  refreshToken: 'string';
}

type LoginType = Omit<RegistrationType, 'name'>;

export {
  LoginType, RegistrationType, ResponseLogin, RefreshToken,
};
