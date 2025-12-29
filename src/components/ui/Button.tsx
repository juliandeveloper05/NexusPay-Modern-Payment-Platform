'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: `
    text-white font-semibold
    bg-gradient-to-r from-nexus-600 to-magenta-600
    hover:from-nexus-500 hover:to-magenta-500
    shadow-lg shadow-nexus-500/25
    hover:shadow-xl hover:shadow-nexus-500/30
  `,
  secondary: `
    text-nexus-700 dark:text-nexus-300 font-medium
    bg-nexus-500/10 hover:bg-nexus-500/20
    border border-nexus-500/30 hover:border-nexus-500/50
  `,
  ghost: `
    text-gray-700 dark:text-gray-300 font-medium
    hover:bg-gray-500/10
    border border-transparent hover:border-gray-500/20
  `,
  danger: `
    text-white font-semibold
    bg-gradient-to-r from-red-600 to-rose-600
    hover:from-red-500 hover:to-rose-500
    shadow-lg shadow-red-500/25
  `,
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-6 py-3 text-base rounded-xl gap-2',
  lg: 'px-8 py-4 text-lg rounded-2xl gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: isDisabled ? 1 : 1.02 }}
        whileTap={{ scale: isDisabled ? 1 : 0.98 }}
        transition={{ duration: 0.2 }}
        disabled={isDisabled}
        className={`
          relative inline-flex items-center justify-center
          transition-all duration-300 ease-out
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <Loader2 className="w-4 h-4 animate-spin absolute left-1/2 -translate-x-1/2" />
        )}

        {/* Content */}
        <span className={`inline-flex items-center ${sizes[size].split(' ').find(s => s.startsWith('gap'))} ${loading ? 'opacity-0' : 'opacity-100'}`}>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
