import React, { FC } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';
import { ProgressMode } from './entities/progress-mode';

export interface ProgressIndicatorProps extends FlexProps {
  children: JSX.Element[] | JSX.Element;
  mode?: ProgressMode;
  colorScheme?: string;
}

export const ProgressIndicator: FC<ProgressIndicatorProps> = ({
  mode,
  children,
  colorScheme = 'blue',
  ...props
}) => {
  const childList: JSX.Element[] = Array.isArray(children)
    ? (children as JSX.Element[])
    : [children];

  return (
    <Flex direction={mode === 'vertical' ? 'column' : 'row'} {...props}>
      {childList.map((child, index) =>
        React.cloneElement(child, {
          index: index + 1,
          mode,
          colorScheme,
          key: index,
        })
      )}
    </Flex>
  );
};
