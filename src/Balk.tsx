import { useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { TextureLoader, Mesh, MeshStandardMaterial, Group } from "three";

// Import model and textures as URLs
import balkFile from "./assets/models/balk_150x150x2200.obj?url";
import balkCornerFile from "./assets/models/balk_corner.obj?url";
import balkTexture from "./assets/textures/texture_wood.jpg?url";
import balkNormalMap from "./assets/textures/texture_wood_normal.jpg?url";

// BalkModel: Loads the balk and corner models and groups them together
function BalkModel() {
  // Load the main balk and corner models
  const balk = useLoader(OBJLoader, balkFile);
  const balkCorner = useLoader(OBJLoader, balkCornerFile);

  // Load the textures (diffuse texture and normal map)
  const texture = useLoader(TextureLoader, balkTexture);
  const normalMap = useLoader(TextureLoader, balkNormalMap);

  // Apply textures to the balk
  balk.traverse((child) => {
    if (child instanceof Mesh) {
      // Apply material with texture and normal map
      child.material = new MeshStandardMaterial({
        map: texture,
        normalMap: normalMap,
      });
    }
  });

  // Apply textures to the balk_corner
  balkCorner.traverse((child) => {
    if (child instanceof Mesh) {
      // Apply material with texture and normal map (can be same or different)
      child.material = new MeshStandardMaterial({
        map: texture, // Same texture as the balk
        normalMap: normalMap, // Same normal map as the balk
      });
    }
  });

  // Create a group to combine balk and balk_corner
  const group = new Group();
  group.add(balk);

  // Position the balk_corner relative to the balk
  balkCorner.position.set(0, 0, 0); // Adjust this according to how it should attach
  group.add(balkCorner);

  return <primitive object={group} scale={1} />;
}

// Balk: Wraps the BalkModel in a Suspense component
function Balk() {
  return (
    <Suspense fallback={null}>
      <BalkModel />
    </Suspense>
  );
}

export default Balk;
