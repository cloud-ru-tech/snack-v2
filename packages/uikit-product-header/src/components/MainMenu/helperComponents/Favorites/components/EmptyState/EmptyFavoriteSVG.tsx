export function EmptyFavoriteSVG({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      data-favorite='true'
      xmlns='http://www.w3.org/2000/svg'
      width='40'
      height='40'
      viewBox='0 0 40 40'
      fill='none'
    >
      <path
        opacity='0.64'
        d='M2 20.6674L2 33.3043C2 35.8977 4.10232 38 6.69565 38H33.3043C35.8977 38 38 35.8977 38 33.3043V20.6674M2 19.2108L2 6.69566C2 4.10232 4.10232 2 6.69565 2H33.3043C35.8977 2 38 4.10232 38 6.69565C38 6.69565 38 13.9328 38 19.2108'
        fill='none'
        strokeWidth='1.5'
      />
      <path
        d='M20 6L24.7699 14.4348L34.2658 16.3647L27.7178 23.5077L28.8168 33.1353L20 29.115L11.1832 33.1353L12.2822 23.5077L5.73415 16.3647L15.2301 14.4348L20 6Z'
        stroke='none'
      />
    </svg>
  );
}
