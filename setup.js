import * as THREE from './vendors/three.module.js'
import { OrbitControls } from './vendors/OrbitControls.js'
import Stats from './vendors/stats.module.js'

function setup(canvas) {
    const { clientWidth: w, clientHeight: h } = canvas
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setSize(w, h)

    const camera = new THREE.PerspectiveCamera(45, w / h, 1, 500)
    camera.position.set(0, 40, 35)
    const controls = new OrbitControls(camera, canvas)
    controls.update()

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x00030B)
    
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.0)
    directionalLight.position.set(0, 20, 5)
    scene.add(directionalLight)
    
    const grid = new THREE.GridHelper(40, 8)
    scene.add(grid)

    const axes = new THREE.AxesHelper(10)
    scene.add(axes)

    const stats = new Stats()
    document.body.appendChild(stats.dom)

    return {
        renderer,
        scene,
        camera,
        stats
    }
}

export default setup