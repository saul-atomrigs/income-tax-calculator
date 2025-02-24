interface LoadingProps {
  message?: string;
}

export default function Loading({ message = 'Loading...' }: LoadingProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
      }}
    >
      <div
        style={{
          width: '1rem',
          height: '1rem',
          border: '2px solid #d1d5db',
          borderTopColor: '#3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <span style={{ color: '#4b5563' }}>{message}</span>
    </div>
  );
}
