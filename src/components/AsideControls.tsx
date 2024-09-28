import { ChangeEvent } from "react";
import { useBalksContext } from "../hooks/useBalksContext";

function AsideControls() {
  const { config, setConfig } = useBalksContext();

  const handleWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const width = parseFloat(event.target.value);
    console.log(width)
    setConfig((prev) => ({ ...prev, width }));
  };

  const handleDepthChange = (event: ChangeEvent<HTMLInputElement>) => {
    const depth = parseFloat(event.target.value);
    console.log(depth)
    setConfig((prev) => ({ ...prev, depth }));
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
      <h2>Aside Content</h2>
      <div style={{ paddingBlock: "8px" }}></div>
      <h2>Balk Configuration</h2>
      <div>
        <label htmlFor="width">Width (mm): </label>
        <input
          type="range"
          id="width"
          min={3}
          max={20}
          step={0.5}
          value={config.width}
          onChange={handleWidthChange}
        />
        <span>{config.width * 1000}</span>
      </div>
      <div>
        <label htmlFor="depth">Depth (mm): </label>
        <input
          type="range"
          id="depth"
          min={3}
          max={5}
          step={0.5}
          value={config.depth}
          onChange={handleDepthChange}
        />
        <span>{config.depth * 1000}</span>
      </div>
    </aside>
  );
}

export default AsideControls;
