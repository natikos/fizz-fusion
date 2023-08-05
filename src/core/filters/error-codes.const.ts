enum ClientErrorCode {
  InvalidCredentials = 'invalid_credentials',
}

export const ERROR_CODES: Record<string, ClientErrorCode> = {
  wrong_login: ClientErrorCode.InvalidCredentials,
  wrong_password: ClientErrorCode.InvalidCredentials,
};
