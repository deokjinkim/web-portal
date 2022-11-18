import React, { ForwardedRef, forwardRef } from 'react';

import styled, { css, keyframes } from 'styled-components';

import RefreshAnimatedIcon from 'src/assets/icons/refresh_animated.svg';
import { boxShadow, colors, px, typography } from 'src/styles';
import ServiceScreen from 'src/common/components/ServiceScreen';

export const BASE_CARD_PADDING = 24;

type BaseCardProps = React.PropsWithChildren<Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>>;

interface CardProps extends BaseCardProps, React.RefAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string | boolean;
  action?: React.ReactNode;
  loading?: boolean;
  empty?: boolean;
  error?: boolean;
  contentChanging?: boolean;
  onReload?: () => void;
}

type CardContainerProps = React.PropsWithChildren<Pick<CardProps, 'loading'>>;

const CardContainer = styled.div.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    defaultValidatorFn(prop) && !['loading'].includes(prop),
})<CardContainerProps>`
  display: flex;
  flex-direction: column;
  background-color: ${colors.surface};
  box-shadow: ${boxShadow.card};
  border-radius: ${px(4)};
  box-sizing: border-box;
  padding: ${px(BASE_CARD_PADDING)} ${px(BASE_CARD_PADDING)} ${px(16)};
  overflow: visible;
  position: relative;
  ${({ loading }) =>
    loading &&
    css`
      pointer-events: none;
      * {
        cursor: default;
      }
    `}

  > * {
    min-width: 0;
    min-height: 0;
    overflow: visible;
  }
` as React.FC<CardContainerProps>;

type ContentProps = React.PropsWithChildren<Pick<CardProps, 'loading' | 'contentChanging'>>;

const Content = styled(({ loading, contentChanging, ...props }: ContentProps) => (
  <div {...props} />
))`
  transition: ${({ loading, contentChanging, theme }) =>
    !loading && !contentChanging && `opacity 0.3s ${theme.animation.defaultTiming}`};
  opacity: ${({ loading, contentChanging }) => (loading || contentChanging ? 0 : 1)};
  flex: 1;
  position: relative;
`;

const AppearanceDelayAnim = keyframes`
  0% { opacity: 0; }
  80% { opacity: 0; }
  100% { opacity: 1; }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div<{ hasSubtitle: boolean }>`
  display: flex;
  justify-content: space-between;
  height: ${({ hasSubtitle }) => (hasSubtitle ? px(21) : px(43))};
`;

const TitleText = styled.p`
  ${typography.headingXSmall};
  color: ${colors.textPrimaryDark};
  display: inline-block;
  margin: 0;
`;

const Subtitle = styled.div<{ subtitle?: string | boolean }>`
  ${typography.bodySmallRegular};
  color: ${colors.textSecondaryGray};
  min-height: ${({ subtitle }) => (subtitle === true ? px(20) : px(43))};
  min-width: ${px(50)};
  display: flex;
  margin-top: ${px(8)};
`;

const RefreshIconStyled = styled(RefreshAnimatedIcon)`
  margin-left: ${px(9)};
  flex-shrink: 0;
  animation: ${AppearanceDelayAnim} 1.25s;
`;

const Action = styled(({ loading, ...props }) => <div {...props} />)`
  display: ${({ loading }) => (loading ? 'none' : 'flex')};
  overflow: visible;
  position: relative;
`;

const Card = forwardRef(
  (
    {
      title,
      subtitle,
      action,
      loading,
      empty,
      children,
      error,
      onReload,
      contentChanging,
      ...props
    }: CardProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const renderContent = () => {
      if (error) {
        return <ServiceScreen onReload={onReload} type="error" data-testid="error-screen" />;
      }
      if (empty) {
        return <ServiceScreen type="empty" data-testid="empty-screen" />;
      }

      return children;
    };

    return (
      <CardContainer ref={ref} loading={loading} {...props}>
        {title && (
          <TitleContainer>
            <Title hasSubtitle={!!subtitle}>
              <TitleText data-testid="title">{title}</TitleText>
              {loading && <RefreshIconStyled data-testid="loader" />}
              {action && !error && !empty && <Action loading={loading}>{action}</Action>}
            </Title>
            {subtitle && (
              <Subtitle data-testid="subtitle" subtitle={subtitle}>
                {subtitle}
              </Subtitle>
            )}
          </TitleContainer>
        )}
        <Content loading={loading} contentChanging={contentChanging}>
          {renderContent()}
        </Content>
      </CardContainer>
    );
  }
);

export default Card;
