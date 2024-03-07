import { useState } from "react";
import { ColorChangeHandler, ColorResult, SketchPicker } from "react-color";
import { useColorContext } from "~/hooks";
import { opacityToHex } from "~/utils";

const ColorPicker = () => {
  const { color, onChange } = useColorContext();
  const [fontColor, setFontColor] = useState("white");

  const handleChange: ColorChangeHandler = (color: ColorResult) => {
    const { r, g, b, a } = color.rgb;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const opacity = a ?? 1;
    const hex = `${color.hex}${opacityToHex(opacity)}`;
    setFontColor(luma < 127.5 && opacity >= 0.5 ? "white" : "black");
    onChange(hex);
  };

  const handleButtonClick = () => {
    window.navigator.clipboard.writeText(color);
  };

  return (
    <div className="color-picker">
      <SketchPicker color={color} onChange={handleChange} />
      <button
        style={{ color: fontColor, backgroundColor: color }}
        onClick={handleButtonClick}
      >
        {color}
      </button>
    </div>
  );
};

export default ColorPicker;
