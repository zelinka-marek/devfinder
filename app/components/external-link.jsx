export function ExternalLink(props) {
  const { href, className, children } = props;

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}
