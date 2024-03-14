export default function Drawer({
  isOpen,
  selectedCard,
  leftIcon,
  rightIcon,
  onLeftIconClick,
  children,
}) {
  return (
    <div className={`drawer ${isOpen ? "open" : ""}`}>
      <div
        className="drawer-icons"
        style={{ justifyContent: selectedCard ? "" : "space-between" }}
      >
        <div className="icon-wrapper" onClick={onLeftIconClick}>
          {leftIcon}
        </div>
        {selectedCard && <div style={{ fontSize: "20px" }}>New Thread</div>}
        <div className="icon-wrapper" onClick={onLeftIconClick}>
          {rightIcon}
        </div>
      </div>
      <div className="drawer-content">{children}</div>
    </div>
  );
}
