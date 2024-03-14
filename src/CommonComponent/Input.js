import { FaArrowUp } from "react-icons/fa";
export default function Input({
  handleChange,
  inputValue,
  handleKeyDown,
  handleClick,
}) {
  return (
    <div className="inputContainer">
      <input
        type="text"
        placeholder="Talk with PI"
        value={inputValue}
        className="inputField"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <FaArrowUp className="icon" onClick={handleClick} />
    </div>
  );
}
