import * as THREE from 'three'
// import { useLayoutEffect, useRef, useState } from 'react'
// import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Clone, Float as FloatImpl, Mask, useMask } from '@react-three/drei'
import useSpline from '@splinetool/r3f-spline'
import { useLayoutEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Iconator } from './Iconator'
import A from './A'
// import Embed from './Embed'
// import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'

// 三维内容整合
export const Scene = () => {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const v = new THREE.Vector3()// 
  const wheel = useRef(0)
  const hand = useRef<THREE.Group<THREE.Object3DEventMap> | null>(null);
  const [clicked, click] = useState(false)
  const { nodes } = useSpline('refresh.spline')
  const stencil = useMask(1, true)
  // Take the stencil and drop it over everything but the right hand
  // 加载屏幕（玻璃&html）
  useLayoutEffect(() => {
    // console.log(nodes)
    Object.values(nodes).forEach(
      (node) => {
        if (!node) return node
        if (node.material) {
          if (!(node.name as string).startsWith(
            'hand'
          )) {
            Object.assign(node.material, stencil)
          }
        }
        return node
      })
  })


  // 控制右手和摄像机跟随鼠标
  useFrame((state) => {
    v.copy({ x: state.pointer.x, y: state.pointer.y, z: 0 })
    v.unproject(state.camera)
    if (hand.current) {
      hand.current.rotation.x = THREE.MathUtils.lerp(hand.current.rotation.x, clicked ? -0.7 : -0.5, 0.2)
      hand.current.position.lerp({ x: v.x - 100, y: wheel.current + v.y, z: v.z }, 0.4)
    }
    state.camera.zoom = THREE.MathUtils.lerp(state.camera.zoom, clicked ? 1.4 : 1, clicked ? 0.025 : 0.15)
    state.camera.position.lerp({ x: -state.pointer.x * 120, y: -state.pointer.y * 200, z: 1000 }, 0.1)
    state.camera.lookAt(0, 0, 0)
    state.camera.updateProjectionMatrix()
  })
  return (
    <group position={[0, 0, -50]} >

      {/* 各种表情元素 */}
      <Float object={nodes['Bg-stuff']} />
      <Float object={nodes['Emoji-4']} />
      <Float object={nodes['Emoji-2']} />
      <Float object={nodes['Emoji-3']} />
      <Float object={nodes['Emoji-1']} />
      <Float object={nodes['Icon-text-2']} />
      <Float object={nodes['Icon-like']} />
      <Float object={nodes['Icon-star']} />
      <Float object={nodes['Icon-play']} />
      <Float object={nodes['Icon-text-1']} />

      {/* 右手 */}
      <group ref={hand}
        scale={1.25}
        position={[0, 0, 400]}
        rotation-y={0.35}
      >
        <Clone object={nodes['handr']} rotation-y={-0.35}
        />
      </group >
      {/* 背景的气泡 */}
      < Clone object={nodes['Bubble-BG']} scale={0.8} position={[0, 180, -400]} />

      {/* 整个手机界面和左手 */}
      <FloatImpl floatIntensity={100} rotationIntensity={0.5} speed={1} >
        {/* 整个手机界面和左手 */}
        <group position={[0, -50, 0]} rotation={[-0.15, 0, 0]} >
          {/* 左手 */}
          <A stencil={stencil} />
          {/* </group> */}
          {/* 整个手机 */}
          <group name="phone" scale={1} position={[-50, 0, -68]}>
            <Mask id={1} scale={0.99} colorWrite={false} depthWrite={false} geometry={nodes.screen.geometry} position={[0, 0, 9.89]} >
              <Html className="content-embed" scale={40} transform
                zIndexRange={[-1, 0]}
              >
                {/* <div style={{ backgroundColor: 'gray', height: '100vh', width: '100vw' }}></div> */}
                <Iconator />
              </Html>
            </Mask>
            {/* 手机硬件 */}

            <Clone object={[nodes['Boolean 2']]} />

            {/* 手机屏幕（玻璃） -  事件的载体 */}
            <mesh
              onWheel={(e) => {
                wheel.current = -e.deltaY / 2
                // Simple defer to reset wheel offset since the browser will never let delta be zero
                clearTimeout(timeout)
                timeout = setTimeout(() => (wheel.current = 0), 100)
              }}
              onPointerDown={(e) => {
                const target = e.target as HTMLElement; // 断言为 HTMLElement
                if (target) {
                  target.setPointerCapture(e.pointerId)
                  click(true)
                }
              }}
              onPointerUp={(e) => {
                const target = e.target as HTMLElement; // 断言为 HTMLElement
                if (target) {
                  target.releasePointerCapture(e.pointerId)
                  click(false)
                }
              }}
              receiveShadow
              geometry={nodes.screen.geometry}>
              <meshStandardMaterial color={'red'} transparent opacity={0.1} />
            </mesh>
          </group>
        </group>
      </FloatImpl >
    </group>
  )
}

{/* </group > */ }



interface FloatProps {
  object: THREE.Object3D | THREE.Object3D[];  // 明确指定类型
  intensity?: number;
  rotation?: number;
}
const Float = ({ object, intensity = 300, rotation = 1, ...props }: FloatProps) => (
  <FloatImpl floatIntensity={intensity} rotationIntensity={rotation} speed={2}>
    <Clone object={object} {...props} />
  </FloatImpl>
)
