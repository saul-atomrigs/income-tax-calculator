interface ListProps {
  children: React.ReactNode;
  direction: 'horizontal' | 'vertical';
}

export const List = ({ direction, children }: ListProps) => {
  return (
    <div
      style={{
        width: '100%',
        overflow: direction === 'horizontal' ? 'auto' : 'visible',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          gap: '1rem',
          ...(direction === 'horizontal' && {
            flexWrap: 'nowrap',
            minWidth: 'min-content',
          }),
        }}
      >
        {children}
      </div>
    </div>
  );
};
