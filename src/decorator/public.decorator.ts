import { SetMetadata } from '@nestjs/common';
import { DECORATOR_KEY } from 'src/common/constants';

export const Public = () => SetMetadata(DECORATOR_KEY.PUBLIC, true);
