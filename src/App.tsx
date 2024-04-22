
import { Canvas } from '@react-three/fiber'
import './App.css'


function App() {

  return (

    <Canvas>
      <color attach="background" args={['lightyellow']} />
      <ambientLight />
      <pointLight />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="pink" />
      </mesh>
    </Canvas>

  )
}

export default App
