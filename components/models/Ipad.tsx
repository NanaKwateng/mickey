import { useEffect } from 'react'
import { useGLTF, useVideoTexture } from '@react-three/drei'
import { ThreeElements } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: any
  materials: any
}

export default function TabletModel(
  props: ThreeElements['group']
) {
  const { nodes, materials } = useGLTF('/models/ipad.glb') as GLTFResult

  // 1. Load the video texture
  const videoTexture = useVideoTexture('/videos/screen.mp4', {
    unsuspend: 'canplay',
    muted: true,
    loop: true,
    start: true,
    playsInline: true, // CRITICAL for iOS
    crossOrigin: 'Anonymous',
  })

  // 2. Correct UV Mapping
  useEffect(() => {
    if (videoTexture) {
      videoTexture.flipY = false
      videoTexture.center.set(0.5, 0.5)
      videoTexture.rotation = -Math.PI / 2
      videoTexture.needsUpdate = true
    }
  }, [videoTexture])

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[-Math.PI, 0, 0]} scale={0.01}>

          {/* --- SCREEN --- */}
          <mesh geometry={nodes.Object_13_Custom_0.geometry}>
            <meshBasicMaterial
              map={videoTexture}
              toneMapped={false}
            />
          </mesh>

          {/* --- CHASSIS --- */}
          <mesh geometry={nodes.Object_16_Material_17_0.geometry} material={materials.Material_17} />
          <mesh geometry={nodes.Object_12_Plastic_0.geometry} material={materials.Plastic} />

          {/* Plastic Parts */}
          <group>
            <mesh geometry={nodes.Object_111_Plastic_0.geometry} material={materials.Plastic} />
            <mesh geometry={nodes.Object_112_Plastic_0.geometry} material={materials.Plastic} />
            <mesh geometry={nodes.Object_113_Plastic_0.geometry} material={materials.Plastic} />
            <mesh geometry={nodes.Object_126_Plastic_0.geometry} material={materials.Plastic} />
            <mesh geometry={nodes.Object_127_Plastic_0.geometry} material={materials.Plastic} />
            <mesh geometry={nodes.Object_128_Plastic_0.geometry} material={materials.Plastic} />
            <mesh geometry={nodes.Object_129_Plastic_0.geometry} material={materials.Plastic} />
            <mesh geometry={nodes.Object_130_Plastic_0.geometry} material={materials.Plastic} />
            <mesh geometry={nodes.Object_131_Plastic_0.geometry} material={materials.Plastic} />
            <mesh geometry={nodes.Object_132_Plastic_0.geometry} material={materials.Plastic} />
            <mesh geometry={nodes.Object_133_Plastic_0.geometry} material={materials.Plastic} />
            <mesh geometry={nodes.Object_134_Plastic_0.geometry} material={materials.Plastic} />
            <mesh geometry={nodes['Object_122_Plastic_(2)_0'].geometry} material={materials.Plastic_2} />
            <mesh geometry={nodes['Object_123_Plastic_(2)_0'].geometry} material={materials.Plastic_2} />
            <mesh geometry={nodes['Object_124_Plastic_(2)_0'].geometry} material={materials.Plastic_2} />
            <mesh geometry={nodes['Object_125_Plastic_(2)_0'].geometry} material={materials.Plastic_2} />
            <mesh geometry={nodes['Object_135_Plastic_(2)_0'].geometry} material={materials.Plastic_2} />
          </group>

          {/* Metal Parts */}
          <group>
            <mesh geometry={nodes.Object_11_Metal_0.geometry} material={materials.Metal} />
            <mesh geometry={nodes.Object_15_Metal_0.geometry} material={materials.Metal} />
            <mesh geometry={nodes.Object_31_Metal_0.geometry} material={materials.Metal} />
            <mesh geometry={nodes.Object_37_Metal_0.geometry} material={materials.Metal} />
            <mesh geometry={nodes.Object_40_Metal_0.geometry} material={materials.Metal} />
            <mesh geometry={nodes['Object_38_Metal_(1)_0'].geometry} material={materials.Metal_1} />
            <mesh geometry={nodes['Object_39_Metal_(1)_0'].geometry} material={materials.Metal_1} />
            <mesh geometry={nodes['Object_32_Metal_(2)_0'].geometry} material={materials.Metal_2} />
            <mesh geometry={nodes['Object_34_Metal_(2)_0'].geometry} material={materials.Metal_2} />
            <mesh geometry={nodes['Object_1_Metal_(4)_0'].geometry} material={materials.Metal_4} />
            <mesh geometry={nodes['Object_115_Metal_(4)_0'].geometry} material={materials.Metal_4} />
            <mesh geometry={nodes['Object_116_Metal_(4)_0'].geometry} material={materials.Metal_4} />
            <mesh geometry={nodes['Object_117_Metal_(4)_0'].geometry} material={materials.Metal_4} />
          </group>

          {/* Glass & Custom */}
          <mesh geometry={nodes['Object_35_Custom_(1)_0'].geometry} material={materials.Custom_1} />
          <mesh geometry={nodes['Object_42_Custom_(1)_0'].geometry} material={materials.Custom_1} />
          <mesh geometry={nodes.Object_36_Glass_0.geometry} material={materials.Glass} />
          <mesh geometry={nodes.Object_41_Glass_0.geometry} material={materials.Glass} />
          <mesh geometry={nodes['Object_33_Custom_(2)_0'].geometry} material={materials.Custom_2} />

          {/* Metal 5 */}
          <mesh geometry={nodes['Object_9_Metal_(5)_0'].geometry} material={materials.Metal_5} />
          <mesh geometry={nodes['Object_10_Metal_(5)_0'].geometry} material={materials.Metal_5} />
          <mesh geometry={nodes['Object_14_Metal_(5)_0'].geometry} material={materials.Metal_5} />
          <mesh geometry={nodes['Object_114_Metal_(5)_0'].geometry} material={materials.Metal_5} />
          <mesh geometry={nodes['Object_120_Metal_(5)_0'].geometry} material={materials.Metal_5} />

          {/* Dynamic Metal 6 & 7 */}
          {Object.keys(nodes).map((key) => {
            if (key.includes('Metal_(6)') || key.includes('Metal_(7)')) {
              const node = nodes[key] as any
              return (
                <mesh
                  key={key}
                  geometry={node.geometry}
                  material={node.material}
                />
              )
            }
            return null
          })}

        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/ipad.glb')
