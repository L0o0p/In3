

import { Canvas } from '@react-three/fiber'
import './App.css'
import { Model } from './component/Model'
import { OrthographicCamera } from '@react-three/drei'
import { useRef } from 'react'
import { Iconator } from './component/Iconator'




export default function App() {
  const container = useRef<HTMLDivElement>(null)
  // const domContent = useRef()
  return (

    <Iconator />
  )

}
