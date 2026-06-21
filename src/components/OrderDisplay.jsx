import MenuItemVisual from './MenuItemVisual';
import './OrderDisplay.css';

function OrderSlot({ item, active, filled, index }) {
  return (
    <div
      className={`order-slot ${active ? 'active' : ''} ${filled ? 'filled' : ''}`}
      aria-label={filled ? `Slot ${index + 1}: ${item.name}` : `Slot ${index + 1}: empty`}
    >
      {filled && item ? (
        <span className="slot-item" style={{ backgroundColor: item.color }}>
          <MenuItemVisual item={item} size="sm" className="slot-visual" />
        </span>
      ) : (
        <span className="slot-empty" />
      )}
    </div>
  );
}

export default function OrderDisplay({
  phase,
  sequenceItems,
  filledItems,
  studyIndex,
  totalSlots,
  shake,
}) {
  const slots = Array.from({ length: totalSlots }, (_, i) => {
    if (phase === 'study' && studyIndex >= 0) {
      if (i === studyIndex) {
        return { item: sequenceItems[i], active: true, filled: true };
      }
      if (i < studyIndex) {
        return { item: sequenceItems[i], active: false, filled: true };
      }
      return { item: null, active: false, filled: false };
    }

    if (phase === 'recall' || phase === 'won') {
      if (i < filledItems.length) {
        return { item: filledItems[i], active: false, filled: true };
      }
      return { item: null, active: false, filled: false };
    }

    return { item: null, active: false, filled: false };
  });

  return (
    <div className={`order-tray ${shake ? 'shake' : ''}`} role="region" aria-label="Order tray">
      <p className="tray-label">
        {phase === 'study' ? 'Watch the order…' : 'Tap items in order'}
      </p>
      <div className="order-slots">
        {slots.map((slot, i) => (
          <OrderSlot key={i} item={slot.item} active={slot.active} filled={slot.filled} index={i} />
        ))}
      </div>
    </div>
  );
}
