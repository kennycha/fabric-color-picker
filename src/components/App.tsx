import { useState } from "react";
import { colorContext } from "~/hooks";
import VisualizingCanvas from "./VisualizingCanvas";
import ColorPicker from "./ColorPicker";

const App = () => {
  const [color, setColor] = useState<string>("#00000080");

  return (
    <colorContext.Provider value={{ color, onChange: setColor }}>
      <div className="app">
        <VisualizingCanvas />
        <ColorPicker />
      </div>
    </colorContext.Provider>
  );
};

export default App;
