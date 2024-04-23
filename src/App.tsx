

import { Canvas } from '@react-three/fiber'
import './App.css'
import { Pointer } from './component/Pointer'
import { OrthographicCamera } from '@react-three/drei'



export default function App() {

  return (
    <Canvas style={{ background: "lightblue" }} camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <spotLight intensity={0.6} position={[20, 10, 10]} angle={0.2} penumbra={1} shadow-mapSize-width={2048} shadow-mapSize-height={2048} castShadow />
      <mesh receiveShadow>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshPhongMaterial attach="material" color="#272727" />
      </mesh>
      <Pointer />
      {/* <Dodecahedron /> */}
    </Canvas>
  )
}

// function Dodecahedron() {
//   const { viewport } = useThree()

//   const ref = useRef<Mesh>(null)
//   useFrame(({ pointer }) => {
//     const x = (pointer.x * viewport.width) / 2
//     const y = (pointer.y * viewport.height) / 2
//     if (ref.current) {
//       ref.current.position.set(x, y, 0)
//       ref.current.rotation.set(-y, x, 0)
//     }
//   })

//   return (
//     <mesh ref={ref} castShadow>
//       <dodecahedronBufferGeometry attach="geometry" />
//       <meshNormalMaterial attach="material" />
//     </mesh>

//   )
// }


