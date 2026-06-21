import './VintageFrame.css';

function CornerFlourish({ className }) {
  return (
    <svg
      className={`vintage-corner ${className}`}
      viewBox="0 0 56 56"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="5.5" fill="var(--vintage-rose-soft)" opacity="0.85" />
      <circle cx="17" cy="17" r="2.8" fill="var(--vintage-rose-light)" />
      <circle cx="22" cy="18" r="2" fill="var(--vintage-rose-soft)" opacity="0.7" />
      <ellipse cx="30" cy="14" rx="5" ry="2.2" fill="var(--vintage-sage)" opacity="0.65" transform="rotate(35 30 14)" />
      <ellipse cx="12" cy="28" rx="4" ry="2" fill="var(--vintage-sage)" opacity="0.5" transform="rotate(-20 12 28)" />
    </svg>
  );
}

export default function VintageFrame({ children, className = '', as: Tag = 'div', ...rest }) {
  return (
    <Tag className={`vintage-frame ${className}`.trim()} {...rest}>
      <CornerFlourish className="vintage-corner--tl" />
      <CornerFlourish className="vintage-corner--tr" />
      <CornerFlourish className="vintage-corner--bl" />
      <CornerFlourish className="vintage-corner--br" />
      <div className="vintage-frame__inner">{children}</div>
    </Tag>
  );
}
