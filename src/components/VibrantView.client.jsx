export default function VibrantView({children}) {
  return (
    <div className="relative">
      <div className="absolute inset-x-0">{children}</div>
      <div className="">{children}</div>
    </div>
  );
}

{
  /* export default function VibrantView({children}) {
  return (
    <div className="relative">
      <div className="absolute mix-blend-overlay">{children}</div>
      <div className="mix-blend-overlay">{children}</div>
    </div>
  );
} */
}
