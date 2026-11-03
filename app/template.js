/* Each page fades in softly on navigation. Opacity only: a transform here would break the home page's pinned and fixed layers. */
export default function Template({ children }) {
  return <div className="pg-in">{children}</div>;
}
