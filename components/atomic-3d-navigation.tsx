"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RotateCcw, Sun } from "lucide-react"

interface Pathway {
  id: string
  label: string
  title: string
  description: string
  color: string
  details: { [key: string]: string }
  satellites: { label: string; description: string; onClick?: () => void }[]
}

interface Atomic3DNavigationProps {
  pathways: Pathway[]
  onSatelliteClick?: (pathwayId: string, satelliteIndex: number) => void
}

export default function Atomic3DNavigation({ pathways, onSatelliteClick }: Atomic3DNavigationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentState, setCurrentState] = useState<"overview" | "content">("overview")
  const [selectedPathway, setSelectedPathway] = useState<Pathway | null>(null)
  const [showOrbits, setShowOrbits] = useState(true)
  const sceneRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return

    // Dynamically import Three.js
    Promise.all([import("three"), import("three/examples/jsm/controls/OrbitControls.js")]).then(
      ([THREE, { OrbitControls }]) => {
        const canvas = canvasRef.current!

        // Scene setup
        const scene = new (THREE as any).Scene()
        scene.fog = new (THREE as any).Fog(0x0a0e27, 10, 30)

        // Camera
        const camera = new (THREE as any).PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
        camera.position.set(0, 5, 15)
        camera.lookAt(0, 0, 0)

        // Renderer
        const renderer = new (THREE as any).WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
        })
        renderer.setSize(canvas.clientWidth, canvas.clientHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // Controls
        const controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.autoRotate = true
        controls.autoRotateSpeed = 0.5

        // Lights
        const ambientLight = new (THREE as any).AmbientLight(0xffffff, 0.3)
        scene.add(ambientLight)

        const pointLight1 = new (THREE as any).PointLight(0x00d4ff, 2, 20)
        pointLight1.position.set(5, 5, 5)
        scene.add(pointLight1)

        const pointLight2 = new (THREE as any).PointLight(0xff0080, 2, 20)
        pointLight2.position.set(-5, -5, 5)
        scene.add(pointLight2)

        // Star field
        const starsGeometry = new (THREE as any).BufferGeometry()
        const starCount = 1000
        const positions = new Float32Array(starCount * 3)
        for (let i = 0; i < starCount * 3; i++) {
          positions[i] = (Math.random() - 0.5) * 50
        }
        starsGeometry.setAttribute("position", new (THREE as any).BufferAttribute(positions, 3))
        const starsMaterial = new (THREE as any).PointsMaterial({
          color: 0xffffff,
          size: 0.05,
          transparent: true,
          opacity: 0.8,
          blending: (THREE as any).AdditiveBlending,
        })
        const stars = new (THREE as any).Points(starsGeometry, starsMaterial)
        scene.add(stars)

        // Nucleus
        const nucleusGeometry = new (THREE as any).SphereGeometry(1, 32, 32)
        const nucleusMaterial = new (THREE as any).MeshPhysicalMaterial({
          color: 0xff0080,
          emissive: 0xff0080,
          emissiveIntensity: 0.5,
          metalness: 0.3,
          roughness: 0.2,
          transparent: true,
          opacity: 0.9,
          clearcoat: 1,
        })
        const nucleus = new (THREE as any).Mesh(nucleusGeometry, nucleusMaterial)
        scene.add(nucleus)

        // Glow around nucleus
        const glowGeometry = new (THREE as any).SphereGeometry(1.3, 32, 32)
        const glowMaterial = new (THREE as any).MeshBasicMaterial({
          color: 0xff0080,
          transparent: true,
          opacity: 0.2,
          side: (THREE as any).BackSide,
        })
        const glow = new (THREE as any).Mesh(glowGeometry, glowMaterial)
        nucleus.add(glow)

        // Electrons (pathways)
        const electrons: any[] = []
        const orbitRadius = 5
        const colorMap: { [key: string]: number } = {
          orange: 0xffaa00,
          red: 0xff0080,
          blue: 0x00d4ff,
          green: 0x00ff88,
        }

        pathways.forEach((pathway, index) => {
          const angle = (index * (360 / pathways.length) * Math.PI) / 180
          const electronGeometry = new (THREE as any).SphereGeometry(0.6, 32, 32)
          const electronMaterial = new (THREE as any).MeshPhysicalMaterial({
            color: colorMap[pathway.color] || 0x00d4ff,
            emissive: colorMap[pathway.color] || 0x00d4ff,
            emissiveIntensity: 0.3,
            metalness: 0.5,
            roughness: 0.1,
            transparent: true,
            opacity: 0.9,
            clearcoat: 1,
          })
          const electron = new (THREE as any).Mesh(electronGeometry, electronMaterial)

          const x = Math.cos(angle) * orbitRadius
          const y = Math.sin(angle * 0.5) * 2
          const z = Math.sin(angle) * orbitRadius

          electron.position.set(x, y, z)
          electron.userData = {
            pathway,
            originalPosition: { x, y, z },
            angle,
          }

          scene.add(electron)
          electrons.push(electron)

          // Trail
          const trailGeometry = new (THREE as any).SphereGeometry(0.8, 16, 16)
          const trailMaterial = new (THREE as any).MeshBasicMaterial({
            color: colorMap[pathway.color] || 0x00d4ff,
            transparent: true,
            opacity: 0.15,
            side: (THREE as any).BackSide,
          })
          const trail = new (THREE as any).Mesh(trailGeometry, trailMaterial)
          electron.add(trail)
        })

        // Orbits
        const orbits: any[] = []
        const curve = new (THREE as any).EllipseCurve(0, 0, orbitRadius, orbitRadius, 0, 2 * Math.PI, false, 0)
        const points = curve.getPoints(100)
        const orbitGeometry = new (THREE as any).BufferGeometry().setFromPoints(points)
        const orbitMaterial = new (THREE as any).LineBasicMaterial({
          color: 0x4080ff,
          transparent: true,
          opacity: showOrbits ? 0.2 : 0,
        })
        const orbitLine = new (THREE as any).Line(orbitGeometry, orbitMaterial)
        orbitLine.rotation.x = Math.PI / 2
        scene.add(orbitLine)
        orbits.push(orbitLine)

        // Raycaster for click detection
        const raycaster = new (THREE as any).Raycaster()
        const mouse = new (THREE as any).Vector2()

        const onMouseClick = (event: MouseEvent) => {
          const rect = canvas.getBoundingClientRect()
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

          raycaster.setFromCamera(mouse, camera)
          const intersects = raycaster.intersectObjects(electrons)

          if (intersects.length > 0 && currentState === "overview") {
            const electron = intersects[0].object
            setSelectedPathway(electron.userData.pathway)
            setCurrentState("content")
          }
        }

        canvas.addEventListener("click", onMouseClick)

        // Animation loop
        let animationFrameId: number
        const animate = () => {
          animationFrameId = requestAnimationFrame(animate)

          // Rotate nucleus
          nucleus.rotation.y += 0.01

          // Rotate electrons around nucleus
          if (currentState === "overview") {
            electrons.forEach((electron, index) => {
              const time = Date.now() * 0.0005
              const angle = electron.userData.angle + time
              const x = Math.cos(angle) * orbitRadius
              const y = Math.sin(angle * 0.5) * 2
              const z = Math.sin(angle) * orbitRadius
              electron.position.set(x, y, z)
            })
          }

          controls.update()
          renderer.render(scene, camera)
        }
        animate()

        // Resize handler
        const handleResize = () => {
          if (!canvas) return
          camera.aspect = canvas.clientWidth / canvas.clientHeight
          camera.updateProjectionMatrix()
          renderer.setSize(canvas.clientWidth, canvas.clientHeight)
        }
        window.addEventListener("resize", handleResize)

        sceneRef.current = {
          scene,
          camera,
          renderer,
          controls,
          nucleus,
          electrons,
          orbits,
          THREE,
        }

        // Cleanup
        return () => {
          window.removeEventListener("resize", handleResize)
          canvas.removeEventListener("click", onMouseClick)
          cancelAnimationFrame(animationFrameId)
          renderer.dispose()
        }
      },
    )
  }, [pathways, currentState, showOrbits])

  const resetView = () => {
    setCurrentState("overview")
    setSelectedPathway(null)
  }

  const toggleOrbits = () => {
    setShowOrbits(!showOrbits)
    if (sceneRef.current) {
      sceneRef.current.orbits.forEach((orbit: any) => {
        orbit.material.opacity = !showOrbits ? 0.2 : 0
      })
    }
  }

  return (
    <div className="relative w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Canvas */}
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Top controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={resetView}
          className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20"
          title="Réinitialiser"
        >
          <RotateCcw className="h-4 w-4 text-white" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleOrbits}
          className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20"
          title="Afficher/Masquer orbites"
        >
          <Sun className="h-4 w-4 text-white" />
        </Button>
      </div>

      {/* Overview state */}
      {currentState === "overview" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4 animate-fade-in">
            Parcours Coronaires
          </h1>
          <p className="text-lg text-white/80 text-center max-w-2xl mb-8">
            Cliquez sur un électron pour explorer son parcours
          </p>
          <div className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white text-sm">Cliquez sur un parcours</span>
          </div>
        </div>
      )}

      {/* Content state */}
      {currentState === "content" && selectedPathway && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10 pointer-events-auto">
          <Button
            onClick={resetView}
            variant="outline"
            className="absolute top-20 left-4 gap-2 bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>

          <div className="bg-white/10 backdrop-blur-2xl border border-white/30 rounded-3xl p-8 max-w-2xl w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">⚛️</div>
              <h2 className="text-3xl font-bold text-white mb-2">{selectedPathway.title}</h2>
              <p className="text-white/80 text-lg">{selectedPathway.description}</p>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {Object.entries(selectedPathway.details).map(([key, value]) => (
                <div key={key} className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                  <p className="text-white/60 text-xs mb-1">{key}</p>
                  <p className="text-white text-xl font-bold">{value}</p>
                </div>
              ))}
            </div>

            {/* Satellites */}
            <div className="flex flex-wrap gap-3 justify-center">
              {selectedPathway.satellites.map((satellite, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (onSatelliteClick) {
                      onSatelliteClick(selectedPathway.id, index)
                    }
                    if (satellite.onClick) {
                      satellite.onClick()
                    }
                  }}
                  className="px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 hover:bg-white/20 transition-all hover:scale-105 text-white text-sm"
                >
                  {satellite.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs z-10">
        Glissez pour faire pivoter • Molette pour zoomer
      </div>
    </div>
  )
}
