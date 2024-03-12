export const TABLE = {
  EMPLOYEE: 'Employee',
  PROJECT: 'Project',
};

export const RESPONSE_MESSAGE = {
  FAILED_TO_FETCH_EMPLOYEE: 'Failed to fetch Employee details',
  EMPLOYEE_NOT_FOUND: 'Employee not found',
  FAILED_TO_FETCH_PROJECT: 'Failed to fetch Project details',
  PROJECT_NOT_FOUND: 'Project not found',
  PERMISSION_DENIED: 'Permission denied',
};

export const TOKEN_EXPIRY = {
  accessToken: '24h',
  refreshToken: '30d',
};
export const TOKEN_SECRET = {
  accessToken: 'hellothisisjwtsecret',
  refreshToken: 'omnexIOT',
};

export const BCRYPT_SALT_ROUNDS = 10;
export const APP_GUARD = 'APP_GUARD';

export const columns: any[] = [
  {
    header: 'Employee Name',
    key: 'name',
    width: 20,
  },
  {
    header: 'Employee Id',
    key: 'employeeId',
    width: 20,
  },
  {
    header: 'Email',
    key: 'email',
    width: 20,
  },
  {
    header: 'Phone Number',
    key: 'phoneNumber',
    width: 20,
  },
  {
    header: 'Password',
    key: 'password',
    width: 20,
  },
];

export const DECORATOR_KEY = {
  ROLES: 'roles',
};
