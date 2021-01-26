import React, { FC } from 'react';
import {
  Checkbox as BaseCheckbox,
  CheckboxProps as BaseCheckboxProps,
} from '@chakra-ui/react';

export { BaseCheckboxProps as CheckboxProps };

export const Checkbox: FC<BaseCheckboxProps> = ({ children, ...props }) => (
  <BaseCheckbox {...props}>{children}</BaseCheckbox>
);
