/* Shared SVG symbols: the olive sprig from the logo, its leaf, and the arrow used on links. */
export default function SvgSprites() {
  return (
    <svg width="0" height="0" style={{position: 'absolute'}} aria-hidden="true">
      <defs>
        <path id="leaf" d="M0 0C7-3.4 18-3.8 27 0C18 3.8 7 3.4 0 0Z"/>
        <symbol id="sprig" viewBox="0 0 70 104" overflow="visible">
          <path d="M30 102C31 74 33 48 41 6" vectorEffect="non-scaling-stroke" fill="none"/>
          <use href="#leaf" transform="translate(30.6 84) rotate(-152)"/>
          <use href="#leaf" transform="translate(31 76) rotate(-26)"/>
          <use href="#leaf" transform="translate(32.2 60) rotate(-158)"/>
          <use href="#leaf" transform="translate(33.2 51) rotate(-30)"/>
          <use href="#leaf" transform="translate(35.6 35) rotate(-146)"/>
          <use href="#leaf" transform="translate(37 28) rotate(-40)"/>
          <use href="#leaf" transform="translate(41 7) rotate(-78) scale(.78)"/>
          <ellipse cx="50" cy="44" rx="7" ry="4.6" transform="rotate(-24 50 44)"/>
        </symbol>
        <symbol id="arrow" viewBox="0 0 26 10"><path d="M0 5h25M20 1l5 4-5 4" fill="none" stroke="currentColor"/></symbol>
      </defs>
    </svg>
  );
}
