import { forwardRef } from 'react';
import type { ChangeEvent } from 'react';
import { formatMoney } from './shared/utils';

interface TextInputProps {
  id?: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'money';
  error?: string;
  required?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  autoFocus?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      name,
      value,
      onChange,
      label,
      placeholder,
      type = 'text',
      error,
      required = false,
      disabled = false,
      style = {},
      autoFocus = true,
    },
    ref
  ) => {
    const handleMoneyChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9]/g, '');
      e.target.value = value;
      onChange(e);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <input
          ref={ref}
          id={id || name}
          name={name}
          type={type === 'money' ? 'text' : type}
          value={value}
          onChange={type === 'money' ? handleMoneyChange : onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoFocus={autoFocus}
          style={{
            borderRadius: '0.375rem',
            outline: 'none',
            caretColor: '#2563EB',
            ...(disabled && {
              backgroundColor: '#F3F4F6',
              cursor: 'not-allowed',
            }),
            ...style,
          }}
        />
        {type === 'money' && value && (
          <p style={{ color: '#4B5563', fontSize: '0.875rem' }}>
            {formatMoney(value)}
          </p>
        )}
        {error && (
          <p style={{ color: '#EF4444', fontSize: '0.875rem' }}>{error}</p>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
