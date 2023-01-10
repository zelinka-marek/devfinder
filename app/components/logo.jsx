export function Logo(props) {
  const { className } = props;

  return (
    <svg
      viewBox="0 0 49 42"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M28.537 1.002V1H1.592v39.908H28.537v-.002c11.01-.17 19.87-9.03 19.87-19.952 0-10.921-8.86-19.782-19.87-19.952Zm-7.156 22.85v3.875c0 3.453-2.822 6.242-6.316 6.242-3.494 0-6.283-2.789-6.283-6.242V14.181c0-3.453 2.789-6.242 6.283-6.242s6.316 2.789 6.316 6.242v9.67Z" />
    </svg>
  );
}
