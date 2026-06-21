import './MenuItemVisual.css';

export default function MenuItemVisual({ item, className = '', size = 'md', style }) {
  if (item.image) {
    return (
      <img
        src={item.image}
        alt=""
        className={`menu-item-visual menu-item-visual--${size} ${className}`.trim()}
        style={style}
        aria-hidden="true"
        draggable={false}
      />
    );
  }

  return (
    <span
      className={`menu-item-visual menu-item-visual--emoji menu-item-visual--${size} ${className}`.trim()}
      style={style}
      aria-hidden="true"
    >
      {item.emoji}
    </span>
  );
}
