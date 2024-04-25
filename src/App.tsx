

import { Canvas } from '@react-three/fiber'
import './App.css'
import { Model } from './component/Model'
import { OrthographicCamera } from '@react-three/drei'
import { useRef } from 'react'




export default function App() {
  const container = useRef<HTMLDivElement>(null)
  // const domContent = useRef()
  return (
    <div
      ref={container}
      className="content-container">
      {/* Container for the HTML view */}
      <div
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}
        // ref={domContent}
      ></div>
      <Canvas
        shadows
        flat
        linear
        // 因为手指的点击和滚动动作的动画通过玻璃模型触发，但是同时要实现真正的html滚动，所以要防止手指的点击和滚动动作影响到html的滚动
        style={{ pointerEvents: 'none' }}
        eventSource={container}// 解决手指活动范围限制在手机屏幕的问题
        eventPrefix="page"
      >
        {/* <OrbitControls /> */}
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.6} position={[20, 10, 10]} angle={0.2} penumbra={1} shadow-mapSize-width={2048} shadow-mapSize-height={2048} castShadow />
        <OrthographicCamera
          makeDefault={true} // make this the default camera
          far={100000}
          near={-100000}
          position={[0, 0, 1000]}
        />
        <Model
        // portal={domContent}
        />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="red" />
        </mesh>
      </Canvas>
    </div>
  )

}
