import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { rig } from '../journey/journeyStore.js'
import { live } from './live.js'
import { ATMOSPHERE } from './palette.js'

const KEYS = ATMOSPHERE.map((k) => ({
  top: new THREE.Color(k.top),
  horizon: new THREE.Color(k.horizon),
  sea: new THREE.Color(k.sea),
  sun: new THREE.Color(k.sun),
  sunPos: new THREE.Vector3(...k.sunPos),
  dir: k.dir,
  hemi: k.hemi,
}))

// Where the low sun hangs in the last shot, as a direction from the camera
const SUNSET = new THREE.Vector3(10, 1.25, 12).normalize().multiplyScalar(420)

const skyShader = {
  vertexShader: /* glsl */ `
    varying vec3 vDir;
    void main() {
      vDir = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: /* glsl */ `
    uniform vec3 top;
    uniform vec3 horizon;
    varying vec3 vDir;
    void main() {
      float h = clamp(normalize(vDir).y, 0.0, 1.0);
      gl_FragColor = vec4(mix(horizon, top, pow(h, 0.55)), 1.0);
      #include <colorspace_fragment>
    }`,
}

// Sky dome, fog, sun and lights, all blended by how far along the journey we are.
export default function Atmosphere({ shadowSize }) {
  const sky = useRef()
  const sun = useRef()
  const disc = useRef()
  const halo = useRef()
  const dirLight = useRef()
  const hemiLight = useRef()
  const shadowed = useRef({ u: -1, frames: 0 })
  const uniforms = useMemo(() => ({ top: { value: new THREE.Color() }, horizon: { value: new THREE.Color() } }), [])

  // The shadow frustum is set through props, which doesn't rebuild its projection
  useEffect(() => dirLight.current.shadow.camera.updateProjectionMatrix(), [])

  useFrame(({ camera, scene, gl }) => {
    // Shadows only move when the sun does, so only re-render them then
    const s = shadowed.current
    if (s.frames < 4 || Math.abs(rig.u - s.u) > 0.004) {
      s.u = rig.u
      s.frames++
      gl.shadowMap.needsUpdate = true
    }

    const i = Math.min(KEYS.length - 2, Math.max(0, Math.floor(rig.u)))
    const f = THREE.MathUtils.clamp(rig.u - i, 0, 1)
    const a = KEYS[i]
    const b = KEYS[i + 1]

    uniforms.top.value.lerpColors(a.top, b.top, f)
    uniforms.horizon.value.lerpColors(a.horizon, b.horizon, f)
    scene.fog.color.copy(uniforms.horizon.value)
    live.sea.lerpColors(a.sea, b.sea, f)

    dirLight.current.color.lerpColors(a.sun, b.sun, f)
    dirLight.current.intensity = a.dir + (b.dir - a.dir) * f
    dirLight.current.position.lerpVectors(a.sunPos, b.sunPos, f)
    hemiLight.current.intensity = a.hemi + (b.hemi - a.hemi) * f
    hemiLight.current.color.copy(uniforms.top.value).lerp(WHITE, 0.6)

    sky.current.position.copy(camera.position)
    const dusk = THREE.MathUtils.smoothstep(rig.u, 3.4, 5)
    sun.current.position.copy(camera.position).add(SUNSET)
    sun.current.lookAt(camera.position)
    disc.current.material.opacity = dusk
    halo.current.material.opacity = dusk * 0.28
  })

  return (
    <>
      <fog attach="fog" args={['#F9EBDD', 55, 215]} />
      <hemisphereLight ref={hemiLight} args={['#FFFFFF', '#E4DCCB', 1.55]} />
      <directionalLight
        ref={dirLight}
        castShadow
        shadow-mapSize={[shadowSize, shadowSize]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.05}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-camera-near={1}
        shadow-camera-far={170}
      />
      <mesh ref={sky} renderOrder={-2} frustumCulled={false}>
        <sphereGeometry args={[600, 24, 12]} />
        <shaderMaterial args={[skyShader]} uniforms={uniforms} side={THREE.BackSide} depthWrite={false} fog={false} />
      </mesh>
      <group ref={sun} renderOrder={-1}>
        <mesh ref={halo} frustumCulled={false}>
          <circleGeometry args={[31, 40]} />
          <meshBasicMaterial color="#FFF1DD" transparent depthWrite={false} fog={false} />
        </mesh>
        <mesh ref={disc} position={[0, 0, 1]} frustumCulled={false}>
          <circleGeometry args={[15, 40]} />
          <meshBasicMaterial color="#FFF6E6" transparent depthWrite={false} fog={false} />
        </mesh>
      </group>
    </>
  )
}

const WHITE = new THREE.Color('#FFFFFF')
