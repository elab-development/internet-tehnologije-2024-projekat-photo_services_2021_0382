// src/components/CustomSelect.jsx
import React, { useState, useRef, useEffect } from "react";

const CustomSelect = ({ options, value, onChange, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // close when clicking outside
  useEffect(() => {
    const onClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div className="custom-select" ref={ref}>
      {label && <label style={{ marginBottom: "10px" }}>{label}</label>}
      <button
        type="button"
        className="custom-select__trigger"
        onClick={() => setOpen(open => !open)}
        style={{ width: "107%" }}
      >
        {selected.label}
        <span className="arrow" />
      </button>
      {open && (
        <ul style={{ marginTop: "-7px", width: "95%" }} className="custom-select__options">
          {options.map(o => (
            <li
              key={o.value}
              className="custom-select__option"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
