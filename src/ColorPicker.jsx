import React, { useState, useEffect } from "react";
import Color from "color";

function ColorPicker() {
  const [color, setColor] = useState({ red: 255, green: 255, blue: 255 }); // State to hold RGB color values
  const [rgb, setRgb] = useState("rgb(255, 255, 255)"); // State to hold the RGB string representation
  const [hex, setHex] = useState("#FFFFFF"); // State to hold the HEX color value
  const [hsl, setHsl] = useState("hsl(0, 0%, 100%)"); // State to hold the HSL color representation

  // Effect to update RGB, HEX, and HSL values when 'color' changes
  useEffect(() => {
    const newRgb = `rgb(${color.red}, ${color.green}, ${color.blue})`;
    setRgb(newRgb); // Update RGB state
    setHex(Color(newRgb).hex()); // Convert RGB to HEX and update state
    setHsl(Color(newRgb).hsl().string()); // Convert RGB to HSL and update state
  }, [color]); // Dependency array includes 'color' to trigger effect when it changes

  // Style object to set background color
  const style = {
    backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
  };

  function handleChange(e) {
    const { name, value } = e.target; // Get name and value from the input event
    setColor((prevColor) => ({
      ...prevColor, // Keep the previous color values
      [name]: value, // Update the specific color component
    }));
  }

  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard.");
      });
  }

  return (
    <div className="color-picker">
      <h1>Color Picker</h1>
      {/* Display the color */}
      <div className="color-display" style={style}>
        <p onClick={() => copyToClipboard(rgb)}>{rgb}</p>
        <p onClick={() => copyToClipboard(hex)}>{hex}</p>
        <p onClick={() => copyToClipboard(hsl)}>{hsl}</p>
      </div>
      {/* Input ranges for adjusting the Red, Green, and Blue values */}
      <label>Red</label>
      <input
        type="range"
        name="red"
        min="0"
        max="255"
        value={color.red}
        onChange={handleChange}
      />
      <label>Green</label>
      <input
        type="range"
        name="green"
        min="0"
        max="255"
        value={color.green}
        onChange={handleChange}
      />
      <label>Blue</label>
      <input
        type="range"
        name="blue"
        min="0"
        max="255"
        value={color.blue}
        onChange={handleChange}
      />
    </div>
  );
}

export default ColorPicker;
