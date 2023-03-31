function ExternalLink({
  children,
  href,
  title,
  className,
}: React.PropsWithChildren<{
  href: string;
  title?: string;
  className?: string;
}>) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      title={title}
    >
      {children}
    </a>
  );
}

export { ExternalLink };
