import * as THREE from 'three'
// import { useLayoutEffect, useRef, useState } from 'react'
// import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Mask, useMask, OrthographicCamera, Clone, Float as FloatImpl } from '@react-three/drei'
import useSpline from '@splinetool/r3f-spline'
import { useLayoutEffect, useRef, useState } from 'react'
// import { Clone, Html, Mask, useMask } from '@react-three/drei'
import Embed from './Embed'
import { useFrame } from '@react-three/fiber'
// import Embed from './Embed'
// import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'

// 三维内容整合
export const Model = ({ ...props }) => {
    let timeout: string | number | NodeJS.Timeout | null | undefined = null
    const { nodes, materials } = useSpline('scroll.splinecode')
    const hand = useRef<THREE.Group>(null)
    const wheel = useRef(0)
    const stencil = useMask(1, true)
    const [clicked, click] = useState(false)
    const v = new THREE.Vector3()// 

    // 监听节点变化，将节点添加到蒙版,详细来说，就是将节点添加到蒙版中，蒙版中只有一个节点，就是节点，节点中只有一个材质，就是材质，材质中只有一个纹理，就是纹理，纹理中
    useLayoutEffect(() => {
        Object.values(nodes).forEach(// 遍历节点
            (node) =>// 遍历节点
                node.material &&// 如果节点有材质
                node.parent.name !== 'hand-r' &&//  如果节点父节点名称不等于hand-r
                node.name !== 'Cube3' &&//  如果节点名称不等于Cube3
                node.name !== 'Cube 8' &&//  如果节点名称不等于Cube 8
                node.name !== 'Cube 17' &&//  如果节点名称不等于Cube 17
                node.name !== 'Cube 24' &&//  如果节点名称不等于Cube 24
                Object.assign(node.material, stencil),// 将节点添加到蒙版中
        )
    }, [])

    // 控制右手和摄像机跟随鼠标
    useFrame((state) => {
        v.copy({ x: state.pointer.x, y: state.pointer.y, z: 0 })
        v.unproject(state.camera)
        if (hand.current) {
            hand.current.rotation.x = THREE.MathUtils.lerp(hand.current.rotation.x, clicked ? -0.7 : -0.5, 0.2)
            hand.current.position.lerp({ x: v.x - 100, y: wheel.current + v.y, z: v.z }, 0.4)
        }
        state.camera.zoom = THREE.MathUtils.lerp(state.camera.zoom, clicked ? 0.9 : 0.7, clicked ? 0.025 : 0.15)
        state.camera.position.lerp({ x: -state.pointer.x * 400, y: -state.pointer.y * 200, z: 1000 }, 0.1)
        state.camera.lookAt(0, 0, 0)
        state.camera.updateProjectionMatrix()
    })

    return (<group>
        {/*  右手模型 */}
        <group ref={hand}>
            <Clone object={nodes['hand-r']} rotation-y={0.35} />
        </group>

        {/* 背景的气泡 */}
        <Clone object={nodes['Bubble-BG']} scale={1.25} />

        {/* <FloatImpl floatIntensity={100} rotationIntensity={0.5} speed={1}> */}
            {/* 手机机身模型 */}
            <Clone object={[nodes['Rectangle 4'], nodes['Rectangle 3'], nodes['Boolean 2']]} />

            {/* 左手 */}
            <Clone object={nodes['hand-l']} position={[80, 100, -150]} />

            <Mask id={1}
                colorWrite={false}// 不写入颜色
                depthWrite={false}// 不写入深度
                geometry={nodes.screen.geometry}// 将节点添加到蒙版中，需要配合上方uselayerEffect 使用
                castShadow receiveShadow// 投射阴影
                position={[0, 0, 9.89]}
            >
                {/* We can drop the HTML inside, make it a 3d-transform and portal it to the dom container above */}
                <Html
                    className="content-embed"
                    // portal={portal}
                    scale={40}
                    transform
                    zIndexRange={[-1, 0]}
                >
                    <Embed />
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
        {/* </FloatImpl> */}
    </group>)
}