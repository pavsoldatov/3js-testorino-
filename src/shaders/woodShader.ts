import { WebGLProgramParametersWithUniforms } from "three";

export const woodShader = `
// Enhance wood grain
    vec3 grainColor = diffuseColor.rgb * 0.8;  // Slightly darken base color
    float grainIntensity = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
    grainIntensity = pow(grainIntensity, 2.0);  // Increase contrast in grain

    // Blend enhanced grain with original color
    diffuseColor.rgb = mix(grainColor, diffuseColor.rgb, grainIntensity);

    // Add subtle warmth to highlights
    vec3 warmColor = vec3(1.0, 0.9, 0.8);  // Warm golden tone
    diffuseColor.rgb = mix(diffuseColor.rgb, warmColor, grainIntensity * 0.4);;
`;

export function applyWoodShader(shader: WebGLProgramParametersWithUniforms) {
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <map_fragment>",
    `
    #include <map_fragment>
    ${woodShader}
    `
  );
}
