import { useEffect, useRef, useState } from 'react';

const MENU_MARGIN_Y = 8

export default function Dropdown({ options, value, onChange }) {
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)
  const [isUp, setIsUp] = useState(false)
  const [menuMaxHeight, setMenuMaxHeight] = useState(0)

  const toggle = () => {
    if (buttonRef.current) {
      const {
        top: buttonTop,
        bottom: buttonBottom,
      } = buttonRef.current.getBoundingClientRect()

      if (window.innerHeight < 500) {
        setIsUp(true)
        setMenuMaxHeight(window.pageYOffset + buttonTop - (MENU_MARGIN_Y * 2))
      } else {
        setIsUp(false)
        setMenuMaxHeight(0)
      }
    }
    setIsOpen(!isOpen)
  };

  useEffect(() => {
      const handleOutsideClick = event => {
        const target = event.target
        if (dropdownRef.current && !dropdownRef.current.contains(target)) {
          setIsOpen(false)
        }
      }
  
      if (isOpen) {
        document.addEventListener("click", handleOutsideClick)
      } else {
        document.removeEventListener("click", handleOutsideClick)
      }
      return () => {
        document.removeEventListener("click", handleOutsideClick)
      }
    }, [isOpen])

  return (
    <div
      className='dropdown'
      ref={dropdownRef}
    >
      <button
        type='button'
        ref={buttonRef}
        onClick={toggle}
      >
        {value} ▾
      </button>
      {isOpen && (
        <ul
          className={isUp ? 'dropdown-menu up' : 'dropdown-menu'}
          style={{ maxHeight: menuMaxHeight ? `${menuMaxHeight}px` : 'none' }}
        >
          {options.map((v) => (
            <li
              key={v}
              onClick={() => {
                onChange(v);
                setIsOpen(false);
              }}
            >
              {v}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
