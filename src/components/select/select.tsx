import React, { forwardRef } from 'react';
import { Props as BaseSelectProps } from 'react-select';
import makeAnimated from 'react-select/animated';
import { components as defaultComponents } from './components';
import { overwriteClassName, overwriteClassPrefix } from './constants';
// overwriting the react-select default styling to match the rock-ui styling
import { StyledBaseSelect } from './styled';

type RockUISelectProps = {
  components?: any;
};

type SelectProps = RockUISelectProps & BaseSelectProps;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { components, className, classNamePrefix, ...restProps } = props;

    const customClassNames = className
      ? `${className} ${overwriteClassName}`
      : overwriteClassName;

    const customComponents = components
      ? { ...defaultComponents, ...components }
      : { ...defaultComponents };

    return (
      <StyledBaseSelect
        components={customComponents}
        className={customClassNames}
        classNamePrefix={classNamePrefix || overwriteClassPrefix}
        ref={ref}
        {...restProps}
      />
    );
  }
);

export { makeAnimated, SelectProps };
