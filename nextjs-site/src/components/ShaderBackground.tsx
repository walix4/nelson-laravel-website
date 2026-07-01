"use client";
import { useEffect, useRef } from "react";

export default function ShaderBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let THREE: typeof import("three");
    let renderer: import("three").WebGLRenderer;
    let geometry: import("three").PlaneGeometry;
    let material: import("three").ShaderMaterial;

    async function init() {
      if (!container) return undefined;
      THREE = await import("three");

      const vertexShader = `void main(){gl_Position=vec4(position,1.0);}`;
      const fragmentShader = `
        #define TWO_PI 6.2831853072
        precision highp float;
        uniform vec2 resolution;
        uniform float time;
        void main(void){
          vec2 uv=(gl_FragCoord.xy*2.0-resolution.xy)/min(resolution.x,resolution.y);
          float t=time*0.05;
          float lineWidth=0.002;
          vec3 color=vec3(0.0);
          for(int j=0;j<3;j++){
            for(int i=0;i<5;i++){
              color[j]+=lineWidth*float(i*i)/abs(fract(t-0.01*float(j)+float(i)*0.01)*5.0-length(uv)+mod(uv.x+uv.y,0.2));
            }
          }
          gl_FragColor=vec4(color[0],color[1],color[2],1.0);
        }
      `;

      const camera = new THREE.Camera();
      camera.position.z = 1;
      const scene = new THREE.Scene();
      geometry = new THREE.PlaneGeometry(2, 2);
      const uniforms = {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2() },
      };
      material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
      scene.add(new THREE.Mesh(geometry, material));

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
      container.appendChild(renderer.domElement);

      const resize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        renderer.setSize(w, h);
        uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height);
      };
      resize();
      window.addEventListener("resize", resize);

      const animate = () => {
        rafRef.current = requestAnimationFrame(animate);
        uniforms.time.value += 0.05;
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(rafRef.current);
        if (container && container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
      };
    }

    let cleanup: (() => void) | undefined;
    init().then((fn) => { cleanup = fn; });

    return () => { cleanup?.(); };
  }, []);

  return <div ref={containerRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}
