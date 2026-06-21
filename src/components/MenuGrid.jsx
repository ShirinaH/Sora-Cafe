import MenuItemVisual from './MenuItemVisual';
import './MenuGrid.css';

export default function MenuGrid({ items, onItemTap, disabled }) {
  return (
    <div className="menu-grid" role="group" aria-label="Menu items">
      {items.map((item, index) => (
        <button
          key={item.id}
          type="button"
          className="menu-item"
          style={{ backgroundColor: item.color }}
          onClick={() => onItemTap(item.id)}
          disabled={disabled}
          aria-label={`${item.name}, key ${index + 1}`}
          title={`${index + 1}: ${item.name}`}
        >
          <MenuItemVisual item={item} size="sm" className="menu-visual" />
          <span className="menu-name">{item.name}</span>
          <span className="menu-key" aria-hidden="true">{index + 1}</span>
        </button>
      ))}
    </div>
  );
}
