


import './App.css'
import { useEffect, useRef } from 'react'
import { Iconator } from './component/Iconator'




export default function App() {
  // 使用 useRef 并指定类型为 HTMLElement，这将创建一个 MutableRefObject<HTMLElement>
  const container = useRef<HTMLDivElement>(null)
  // const domContent = useRef()

  useEffect(() => {
    // 确保在 DOM 渲染后 container.current 已被赋值
    if (container.current) {
      // 可以安全地使用 container.current
      console.log(container.current);
    }
  }, []);
  return (
    <Iconator />
  )

}
