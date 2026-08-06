import { useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'

const dummy = new THREE.Object3D()
const tempColor = new THREE.Color()

// Renders a voxel list as a single InstancedMesh (one draw call per model).
// `size` is the world-units edge of one voxel — the per-model scale knob.
export function VoxelModel({ voxels, size = 0.25, castShadow = true, onClick, ...props }) {
  const meshRef = useRef(null)

  useLayoutEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    voxels.forEach((v, i) => {
      dummy.position.set(v.x * size, (v.y + 0.5) * size, v.z * size)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      mesh.setColorAt(i, tempColor.set(v.c))
    })
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [voxels, size])

  return (
    <group {...props}>
      <instancedMesh
        key={voxels.length}
        ref={meshRef}
        args={[undefined, undefined, voxels.length]}
        castShadow={castShadow}
        receiveShadow
        onClick={onClick}
      >
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial roughness={0.95} metalness={0} />
      </instancedMesh>
    </group>
  )
}

export default VoxelModel
