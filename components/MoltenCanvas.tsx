"use client";

import { useEffect, useRef } from "react";

const VERTEX = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// Domain-warped fbm read as molten steel: black slag, red-hot crust, orange and white-hot veins.
const FRAGMENT = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  float t = u_time * 0.05;
  vec2 m = (u_mouse - 0.5) * vec2(u_res.x / u_res.y, 1.0);
  float glow = exp(-4.0 * length(p - m));

  vec2 q = vec2(fbm(p * 1.4 + vec2(0.0, t)), fbm(p * 1.4 + vec2(5.2, 1.3 - t)));
  vec2 r = vec2(fbm(p * 1.4 + 3.6 * q + vec2(1.7, 9.2) + t * 1.4), fbm(p * 1.4 + 3.6 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.4 + 3.6 * r + glow * 0.5);

  float heat = pow(smoothstep(0.42, 0.95, f), 1.8);
  heat = clamp(heat * 1.35 + glow * 0.22 * f, 0.0, 1.0);

  vec3 col = vec3(0.018, 0.016, 0.016);
  col = mix(col, vec3(0.30, 0.035, 0.01), smoothstep(0.0, 0.3, heat));
  col = mix(col, vec3(0.93, 0.32, 0.06), smoothstep(0.28, 0.68, heat));
  col = mix(col, vec3(1.0, 0.80, 0.50), smoothstep(0.78, 1.0, heat));

  float sheen = fbm(p * 3.2 - t * 2.0) * 0.07;
  col += vec3(sheen * 0.85, sheen * 0.9, sheen) * (1.0 - heat);

  float vignette = smoothstep(1.35, 0.15, length(p * vec2(0.75, 1.0)));
  col *= mix(0.3, 1.0, vignette);
  col += (hash(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.03;
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

/** Full-bleed WebGL molten-steel background. Pauses off-screen; renders one still frame for reduced motion. */
export default function MoltenCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl) {
      canvas.classList.add("is-fallback");
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      canvas.classList.add("is-fallback");
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    // Rendered below device resolution: the image is soft by nature and this keeps it cheap.
    const scale = Math.min(window.devicePixelRatio, 1.5) * 0.6;
    const resize = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: 0.62, y: 0.42 };
    const target = { x: 0.62, y: 0.42 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now() - 20000;
    let frame = 0;
    let visible = true;

    const render = () => {
      mouse.x += (target.x - mouse.x) * 0.04;
      mouse.y += (target.y - mouse.y) * 0.04;
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = () => {
      render();
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const resume = () => {
      if (!frame && visible && !document.hidden && !reduce) frame = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", resume);

    if (reduce) render();
    else resume();
    canvas.classList.add("is-ready");

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={ref} className={`molten ${className ?? ""}`} aria-hidden="true" />;
}
