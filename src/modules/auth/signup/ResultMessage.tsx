import React from 'react';
import styled from 'styled-components';

import { px, typography } from 'src/styles';

interface ResultMessageProps extends React.PropsWithChildren<unknown> {
  picture: JSX.Element;
  title: JSX.Element | string;
  description: JSX.Element | string;
  moreSpace?: boolean;
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: ${px(-14)};

  > * {
    text-align: center;
  }
`;

const Picture = styled.div<Pick<ResultMessageProps, 'moreSpace'>>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(moreSpace) => px(moreSpace ? 240 : 205)};
  height: ${(moreSpace) => px(moreSpace ? 240 : 205)};
`;

const Title = styled.h2<Pick<ResultMessageProps, 'moreSpace'>>`
  ${({ moreSpace }) => (moreSpace ? typography.headingMedium : typography.headingLargeSemibold)};
  margin: 0;
  margin-top: ${({ moreSpace }) => px(moreSpace ? 48 : 32)};
`;

const Description = styled.p<Pick<ResultMessageProps, 'moreSpace'>>`
  ${typography.bodyMediumRegular};
  max-width: ${px(600)};
  margin: 0;
  margin-top: ${({ moreSpace }) => px(moreSpace ? 16 : 8)};

  strong {
    ${typography.bodyMediumSemibold};
  }
`;

const Childs = styled.div``;

const ResultMessage: React.FC<ResultMessageProps> = ({
  moreSpace,
  picture,
  title,
  description,
  children,
}) => (
  <Content>
    <Picture moreSpace={moreSpace}>{picture}</Picture>
    <Title moreSpace={moreSpace}>{title}</Title>
    <Description moreSpace={moreSpace}>{description}</Description>
    {children && <Childs>{children}</Childs>}
  </Content>
);

export default ResultMessage;
