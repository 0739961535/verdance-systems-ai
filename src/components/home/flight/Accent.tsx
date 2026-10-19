/** A title with its accent phrase set in the italic accent style. */
export function Accent({ title, accent }: { title: string; accent: string }) {
  const i = title.indexOf(accent);
  if (i < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, i)}
      <span className="italic-accent">{accent}</span>
    </>
  );
}
