import * as THREE from 'three'
// import { useLayoutEffect, useRef, useState } from 'react'
// import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Mask, useMask, Clone, Float as FloatImpl } from '@react-three/drei'
import useSpline from '@splinetool/r3f-spline'
import { useLayoutEffect, useRef, useState } from 'react'
// import { Clone, Html, Mask, useMask } from '@react-three/drei'
import Embed from './Embed'
import { useFrame } from '@react-three/fiber'
import { Iconator } from './Iconator'
// import Embed from './Embed'
// import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'

// 三维内容整合
export const Model = ({ ...props }) => {
    let timeout = null
    const v = new THREE.Vector3()// 
    const wheel = useRef(0)
    const hand = useRef()
    const [clicked, click] = useState(false)
    const { nodes, materials } = useSpline('scroll.splinecode')
    // Take the stencil and drop it over everything but the right hand
    const stencil = useMask(1, true)

    // 加载屏幕（玻璃&html）
    useLayoutEffect(() => {
        Object.values(nodes).forEach(
            (node) =>
                node.material &&
                node.parent.name !== 'hand-r' &&
                node.name !== 'Cube3' &&
                node.name !== 'Cube 8' &&
                node.name !== 'Cube 17' &&
                node.name !== 'Cube 24' &&
                Object.assign(node.material, stencil),
        )
    }, [])

    // 右手跟随

    // 控制右手和摄像机跟随鼠标
    useFrame((state) => {
        v.copy({ x: state.pointer.x, y: state.pointer.y, z: 0 })
        v.unproject(state.camera)
        hand.current.rotation.x = THREE.MathUtils.lerp(hand.current.rotation.x, clicked ? -0.7 : -0.5, 0.2)
        hand.current.position.lerp({ x: v.x - 100, y: wheel.current + v.y, z: v.z }, 0.4)
        state.camera.zoom = THREE.MathUtils.lerp(state.camera.zoom, clicked ? 0.9 : 0.7, clicked ? 0.025 : 0.15)
        state.camera.position.lerp({ x: -state.pointer.x * 400, y: -state.pointer.y * 200, z: 1000 }, 0.1)
        state.camera.lookAt(0, 0, 0)
        state.camera.updateProjectionMatrix()
    })

    return (
        <group {...props} dispose={null}>
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
            <group ref={hand}>
                <Clone object={nodes['hand-r']} rotation-y={0.35} />
            </group>
            {/* 背景的气泡 */}
            <Clone object={nodes['Bubble-BG']} scale={1.25} />

            {/* 整个手机界面和左手 */}
            <FloatImpl floatIntensity={100} rotationIntensity={0.5} speed={1}>
                {/* 背景的飞溅液态装饰 */}
                {/* <Float intensity={100} rotation={0.5} object={nodes['Bubble-LOGO']} position={[0, -0, 0]} scale={1.5} /> */}
                {/* 整个手机界面和左手 */}
                <group position={[0, -50, 0]} rotation={[-0.15, 0, 0]}>

                    {/* 左手 */}
                    <Clone object={nodes['hand-l']} position={[80, 100, -150]} />

                    {/* 整个手机 */}
                    <group name="phone" position={[-50, 0, -68]}>

                        {/* 手机硬件 */}
                        <Clone object={[nodes['Rectangle 4'], nodes['Rectangle 3'], nodes['Boolean 2']]} />

                        {/* 手机屏幕（内容） */}
                        {/* Mask is a drei component that generates a stencil, we use the phone-screen as a mask, punching a hole into the canvas */}
                        <Mask id={1} colorWrite={false} depthWrite={false} geometry={nodes.screen.geometry} castShadow receiveShadow position={[0, 0, 9.89]}>
                            {/* We can drop the HTML inside, make it a 3d-transform and portal it to the dom container above */}
                            <Html className="content-embed" scale={40} transform zIndexRange={[-1, 0]}>
                                {/* <Embed /> */}
                                <Iconator />
                            </Html>
                        </Mask>

                        {/* 手机屏幕（玻璃） -  事件的载体 */}
                        <mesh
                            onWheel={(e) => {
                                wheel.current = -e.deltaY / 2
                                // Simple defer to reset wheel offset since the browser will never let delta be zero
                                clearTimeout(timeout)
                                timeout = setTimeout(() => (wheel.current = 0), 100)
                            }}
                            onPointerDown={(e) => {
                                e.target.setPointerCapture(e.pointerId)
                                click(true)
                            }}
                            onPointerUp={(e) => {
                                e.target.releasePointerCapture(e.pointerId)
                                click(false)
                            }}
                            receiveShadow
                            geometry={nodes.screen.geometry}>
                            <meshStandardMaterial transparent opacity={0.1} />
                        </mesh>
                    </group>
                </group>
            </FloatImpl>
        </group>
    )
}

const Float = ({ object, intensity = 300, rotation = 1, ...props }) => (
    <FloatImpl floatIntensity={intensity} rotationIntensity={rotation} speed={2}>
        <Clone object={object} {...props} />
    </FloatImpl>
)