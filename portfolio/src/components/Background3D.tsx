import {useMemo, useRef} from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import {Html} from '@react-three/drei'
import * as THREE from 'three'
import {theme} from '../config/theme'
const B = theme.background, I = theme.animation.intensity
const input = {x:0,y:0}
if (typeof window !== 'undefined') window.addEventListener('pointermove', e => { input.x = e.clientX/innerWidth*2-1; input.y = -(e.clientY/innerHeight*2-1) })

function Stars() {
  const pos = useMemo(() => {
    const a = new Float32Array(B.stars.count*3)
    for (let i=0;i<B.stars.count;i++){
      const r = Math.pow(Math.random(),.6)*B.galaxy.radius, arm = i%B.galaxy.arms
      const ang = arm/B.galaxy.arms*Math.PI*2 + r*B.galaxy.twist*.35 + (Math.random()-.5)*.9
      a.set([Math.cos(ang)*r,(Math.random()-.5)*1.2*(1-r/B.galaxy.radius*.6),Math.sin(ang)*r],i*3)
    }; return a }, [])
  return <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[pos,3]}/></bufferGeometry>
    <pointsMaterial size={B.stars.size} color={B.stars.color} transparent opacity={B.stars.opacity} sizeAttenuation depthWrite={false}/></points>
}
function Network() {
  const {pos, lines} = useMemo(() => {
    const n = B.network.nodes, p = new Float32Array(n*3), l:number[] = []
    for (let i=0;i<n;i++) p.set([(Math.random()-.5)*14,(Math.random()-.5)*6,(Math.random()-.5)*8],i*3)
    for (let i=0;i<n;i++) for (let j=i+1;j<n;j++){
      const d = Math.hypot(p[i*3]-p[j*3],p[i*3+1]-p[j*3+1],p[i*3+2]-p[j*3+2])
      if (d < B.network.linkDistance) l.push(p[i*3],p[i*3+1],p[i*3+2],p[j*3],p[j*3+1],p[j*3+2])
    } return {pos:p, lines:new Float32Array(l)} }, [])
  const halo = useRef<THREE.PointsMaterial>(null)
  useFrame(({clock}) => { if (halo.current) halo.current.opacity = B.network.glow*(.6+.4*Math.sin(clock.elapsedTime*1.5*I)) })
  return <group>
    <lineSegments><bufferGeometry><bufferAttribute attach="attributes-position" args={[lines,3]}/></bufferGeometry>
      <lineBasicMaterial color={B.network.lineColor} transparent opacity={B.network.lineOpacity}/></lineSegments>
    <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[pos,3]}/></bufferGeometry>
      <pointsMaterial size={B.network.nodeSize} color={B.network.nodeColor} transparent opacity={.85} sizeAttenuation/></points>
    <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[pos,3]}/></bufferGeometry>
      <pointsMaterial ref={halo} size={B.network.nodeSize*3.2} color={B.network.nodeColor} transparent opacity={B.network.glow} sizeAttenuation depthWrite={false}/></points>
  </group>
}
function Code() {
  const items = useMemo(() => B.code.snippets.map((s,i) => ({s, p:[(Math.random()-.5)*13,(Math.random()-.5)*5,(Math.random()-.5)*5-1] as [number,number,number], k:i})), [])
  const g = useRef<THREE.Group>(null)
  useFrame(({clock}) => g.current?.children.forEach((c,i) => { c.position.y = items[i].p[1] + Math.sin(clock.elapsedTime*.5*I+i)*.25*I }))
  return <group ref={g}>{items.map(it => <group key={it.k} position={it.p}>
    <Html center distanceFactor={9} style={{pointerEvents:'none',color:B.code.color,opacity:.55,fontFamily:'ui-monospace,monospace',fontSize:'14px',whiteSpace:'nowrap'}}>{it.s}</Html></group>)}</group>
}
function Scene() {
  const root = useRef<THREE.Group>(null), gal = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (!root.current || !gal.current) return
    const m = B.mouse.enabled ? B.mouse.strength*I : 0, sy = B.scroll.enabled ? scrollY*B.scroll.strength*I : 0
    gal.current.rotation.y += dt*B.galaxy.spinSpeed*I
    root.current.rotation.y += ((input.x*m*.4) - root.current.rotation.y)*Math.min(1,dt*3)
    root.current.rotation.x += ((-input.y*m*.25 + sy*.4) - root.current.rotation.x)*Math.min(1,dt*3)
    root.current.position.y += (sy*2 - root.current.position.y)*Math.min(1,dt*3)
  })
  return <group ref={root}><group ref={gal} rotation-x={B.galaxy.tilt}><Stars/></group><Network/>{B.code.enabled && <Code/>}</group>
}
export default function Background3D() {
  if (!B.enabled || !theme.animation.enabled || matchMedia('(prefers-reduced-motion: reduce)').matches) return null
  return <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none" style={{opacity:B.opacity}}>
    <Canvas camera={{position:[0,0,9],fov:55}} dpr={[1,1.5]} gl={{alpha:true,antialias:true}}><Scene/></Canvas></div>
}
