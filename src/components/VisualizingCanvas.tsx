import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useColorContext } from "~/hooks";
import {
  PiSmiley,
  PiSmileyXEyesFill,
  PiLineSegment,
  PiPolygon,
} from "react-icons/pi";

const SNAPSHOT_IMAGE_URL = "/fabric-color-picker/images/sample_snapshot.jpg";

const DEFAULT_RENDERER_WIDTH = 960;
const DEFAULT_RENDERER_HEIGHT = 540;

const LINE_POINTS = [100, 100, 200, 200];
const POLYGON_POINTS = [
  { x: 20, y: -20 },
  { x: 110, y: -20 },
  { x: 110, y: 40 },
  { x: 90, y: 60 },
  { x: 0, y: 60 },
  { x: 0, y: 0 },
];

const ICON_STYLES: CSSProperties = {
  cursor: "pointer",
  width: 25,
  height: 25,
  border: "1px solid #00000033",
  borderRadius: "100%",
  backgroundColor: "#ffffff77",
};

const VisualizingCanvas = () => {
  const { color } = useColorContext();

  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedFabricObjects, setSelectedFabricObjects] = useState<
    fabric.Object[]
  >([]);
  const [showsSnapshot, setShowsSnapshot] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleSelectionCreated = (event: fabric.IEvent<MouseEvent>) => {
    if (!event.selected) return;
    setSelectedFabricObjects(event.selected);
  };

  const handleSelectedionCleared = useCallback(() => {
    setSelectedFabricObjects([]);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: DEFAULT_RENDERER_WIDTH,
      height: DEFAULT_RENDERER_HEIGHT,
    });
    canvas.on("selection:created", handleSelectionCreated);
    canvas.on("selection:cleared", handleSelectedionCleared);
    setFabricCanvas(canvas);

    return () => {
      setFabricCanvas(null);
      canvas.dispose();
    };
  }, [handleSelectedionCleared]);

  const checkIsPolygon = (object: fabric.Object): object is fabric.Polygon => {
    return object instanceof fabric.Polygon;
  };

  useEffect(() => {
    if (!fabricCanvas) return;

    selectedFabricObjects.forEach((fabricObject) => {
      if (checkIsPolygon(fabricObject)) {
        fabricObject.set("stroke", color.slice(0, -2));
        fabricObject.set("fill", color);
      } else {
        fabricObject.set("stroke", color.slice(0, -2));
      }
    });
    fabricCanvas.renderAll();
  }, [color, fabricCanvas, selectedFabricObjects]);

  const handleEyeIconClick = () => {
    setShowsSnapshot((prev) => !prev);
  };

  const handleLineIconClick = () => {
    if (!fabricCanvas) return;

    const line = new fabric.Line(LINE_POINTS, {
      top: 100,
      left: 100,
      stroke: color.slice(0, -2),
      strokeWidth: 2,
    });
    fabricCanvas.add(line);
  };

  const handlePolygonIconClick = () => {
    if (!fabricCanvas) return;

    const polygon = new fabric.Polygon(POLYGON_POINTS, {
      top: 100,
      left: 100,
      stroke: color.slice(0, -2),
      strokeWidth: 2,
      fill: color,
    });
    fabricCanvas.add(polygon);
  };

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef}></canvas>
      {showsSnapshot && <img src={SNAPSHOT_IMAGE_URL} alt="sample snapshot" />}
      <div className="buttons">
        {showsSnapshot ? (
          <PiSmileyXEyesFill style={ICON_STYLES} onClick={handleEyeIconClick} />
        ) : (
          <PiSmiley style={ICON_STYLES} onClick={handleEyeIconClick} />
        )}
        <PiLineSegment
          style={ICON_STYLES}
          color={color}
          onClick={handleLineIconClick}
        />
        <PiPolygon
          style={ICON_STYLES}
          color={color}
          onClick={handlePolygonIconClick}
        />
      </div>
    </div>
  );
};

export default VisualizingCanvas;
