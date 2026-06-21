import './CafeInterior.css';

export default function CafeInterior({ children }) {
  return (
    <div className="cafe-interior">
      <div className="interior-content">
        {children}
      </div>
    </div>
  );
}
