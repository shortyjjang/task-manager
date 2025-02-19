import React from 'react';

import './button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Is this the principal call to action on the page? */
  variant?: 'primary' | 'secondary';
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = React.forwardRef(({
  variant = 'primary',
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
  const mode = variant === 'primary' ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      ref={ref}
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
});
