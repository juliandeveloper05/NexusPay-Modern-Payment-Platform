'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragEnd' | 'onDragStart'
> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-5 py-4 text-lg',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      helperText,
      icon,
      size = 'md',
      type = 'text',
      className = '',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
      <div className="w-full space-y-1.5">
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}

          {/* Input field */}
          <motion.input
            ref={ref}
            type={inputType}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            animate={{
              borderColor: error
                ? 'rgb(239 68 68 / 0.5)'
                : success
                ? 'rgb(34 197 94 / 0.5)'
                : isFocused
                ? 'rgb(147 51 234 / 0.5)'
                : 'rgb(147 51 234 / 0.2)',
            }}
            className={`
              w-full rounded-xl
              bg-white/50 dark:bg-dark-700/50
              backdrop-blur-md
              border-2 outline-none
              transition-all duration-300
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              text-gray-900 dark:text-white
              ${icon ? 'pl-10' : ''}
              ${isPassword ? 'pr-10' : ''}
              ${sizes[size]}
              ${error ? 'border-red-500/50 focus:ring-2 focus:ring-red-500/20' : ''}
              ${success ? 'border-green-500/50 focus:ring-2 focus:ring-green-500/20' : ''}
              ${!error && !success ? 'focus:ring-2 focus:ring-nexus-500/20 focus:shadow-glow' : ''}
              ${className}
            `}
            {...props}
          />

          {/* Password toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}

          {/* Status icon */}
          {(error || success) && !isPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {error && <AlertCircle size={18} className="text-red-500" />}
              {success && <Check size={18} className="text-green-500" />}
            </div>
          )}
        </div>

        {/* Helper text / Error */}
        <AnimatePresence>
          {(error || helperText) && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`text-sm ${error ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}
            >
              {error || helperText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';
