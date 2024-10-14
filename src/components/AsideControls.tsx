import { MAX_DEPTH, MAX_WIDTH, MIN_DEPTH, MIN_WIDTH } from "../constants";
import { useControls } from "leva";
import { useDimensionsStore } from "../store/dimensionsStore";
import { useMaterialStore } from "../store/materialStore";
import { Metals, Ruberoids } from "../context/AssetsContext/AssetsContext";
import { useGeometryStore } from "../store/geometryStore";

function AsideControls() {
  const { width, depth, setWidth, setDepth } = useDimensionsStore();
  const {
    setSelectedRoofEdgeMaterial,
    setSelectedRoofMaterial,
    setSelectedBalkMaterial,
    setRoofMetalness,
    setRoofRoughness,
  } = useMaterialStore();
  const { setSelectedRoofEdgeGeometry } = useGeometryStore();

  useControls("Dimensions (meters)", {
    width: {
      value: width,
      min: MIN_WIDTH,
      max: MAX_WIDTH,
      step: 0.5,
      onChange: (value) => setWidth(value),
    },
    depth: {
      value: depth,
      min: MIN_DEPTH,
      max: MAX_DEPTH,
      step: 0.5,
      onChange: (value) => setDepth(value),
    },
  });

  useControls("Roof Edge", {
    selectedMaterial: {
      label: "Metal",
      // the value should conform to the keys of the Metals interface
      value: "whiteMetal",
      options: {
        // the values should conform to the keys of the Metals interface
        White: "whiteMetal",
        Silver: "silverMetal",
        Black: "blackMetal",
      },
      onChange: (value: keyof Metals) => setSelectedRoofEdgeMaterial(value),
    },
    selectedGeometry: {
      label: "Type",
      value: "rounded",
      options: {
        Rounded: "rounded",
        Straight: "straight",
      },
      onChange: (value: "straight" | "rounded") =>
        setSelectedRoofEdgeGeometry(value),
    },
  });

  useControls("Roof", {
    selectedMaterial: {
      label: "Material",
      // the value should conform to the keys of the Ruberoids interface
      value: "ruberoid1",
      options: {
        // the values should conform to the keys of the Ruberoids interface
        ["Ruberoid Type 1"]: "ruberoid1",
        ["Ruberoid Type 2"]: "ruberoid2",
      },
      onChange: (value: keyof Ruberoids) => setSelectedRoofMaterial(value),
    },
    Metalness: {
      value: 1.5,
      min: 0,
      max: 2,
      step: 0.1,
      onChange: (value) => setRoofMetalness(value),
    },
    Roughness: {
      value: 0.7,
      min: 0,
      max: 1,
      step: 0.1,
      onChange: (value) => setRoofRoughness(value),
    },
  });

  useControls("Balks", {
    selectedMaterial: {
      label: "Material",
      value: "wood2",
      options: {
        ["Wood Type 1"]: "wood1",
        ["Wood Type 2"]: "wood2",
        ["Wood Type 3"]: "wood3",
      },
      onChange: (value) => setSelectedBalkMaterial(value),
    },
  });

  return null;
}

export default AsideControls;
