export default function Icon({ className }: { className?: string }) {
    return (
      <svg
        width='1em'
        height='1em'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <path
          d='M16.293 8.29309L12 12.5861L7.70697 8.29309L6.29297 9.70709L12 15.4141L17.707 9.70709L16.293 8.29309Z'
          fill='currentColor'
        />
      </svg>
    );
  }