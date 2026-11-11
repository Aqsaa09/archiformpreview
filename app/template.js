import { ViewTransition } from 'react';

/* Page transition: on every navigation the old page fades out and the new one fades in a moment later, softly blurred,
   using the browser's View Transitions API through React. Header and footer sit in the layout and stay put. The motion is
   styled in app/globals.css (.page-out / .page-in); browsers without the API simply switch pages. */
export default function Template({ children }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
