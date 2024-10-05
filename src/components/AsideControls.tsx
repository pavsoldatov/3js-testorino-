import { ChangeEvent } from "react";
import { useDimensions } from "../hooks/useDimensions";
import { MAX_DEPTH, MAX_WIDTH, MIN_DEPTH, MIN_WIDTH } from "../constants";

function AsideControls() {
  const { dimensions, setDimensions } = useDimensions();

  const handleWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const width = parseFloat(event.target.value);
    setDimensions((prev) => ({ ...prev, width }));
  };

  const handleDepthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const depth = parseFloat(event.target.value);
    setDimensions((prev) => ({ ...prev, depth }));
  };

  return (
    <aside
      style={{
        width: "20%",
        borderRight: "2px solid #cacaca",
        backgroundColor: "#f0f0f0",
        padding: "10px",
      }}
    >
      <h2>Balk dimensionsuration</h2>
      <div style={{ paddingBlock: "4px" }}></div>
      <div style={{ paddingBlock: "0.5rem" }}></div>
      <div style={{ display: "flex", alignItems: "center", lineHeight: "1.8" }}>
        <label htmlFor="width">Width (mm): </label>
        <input
          type="range"
          id="width"
          min={MIN_WIDTH}
          max={MAX_WIDTH}
          step={0.5}
          value={dimensions.width}
          onChange={handleWidthChange}
        />
        <span>{dimensions.width * 1000}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", lineHeight: "1.8" }}>
        <label htmlFor="depth">Depth (mm): </label>
        <input
          type="range"
          id="depth"
          min={MIN_DEPTH}
          max={MAX_DEPTH}
          step={0.5}
          value={dimensions.depth}
          onChange={handleDepthChange}
        />
        <span>{dimensions.depth * 1000}</span>
      </div>
    </aside>
  );
}

export default AsideControls;
