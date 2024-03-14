import { SetMetadata } from '@nestjs/common';
import { DECORATOR_KEY } from 'src/common/constants';
import { ROLE } from 'src/common/enum';

export const Roles = (...roles: ROLE[]) =>
  SetMetadata(DECORATOR_KEY?.ROLES, roles);
