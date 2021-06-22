import * as THREE from './vendors/three.module.js'
import setup from './setup.js'
import Grid from './grid.js'
import GridEntityProxy from './gridEntityProxy.js'
import Entity from './entity.js'

(function main() {
    const canvas = document.getElementById('canvas')
    const { renderer, scene, camera, stats } = setup(canvas)

    const gridEntityProxy = new GridEntityProxy()
    const centerCoords = []
    const gridList = []
    const center = new THREE.Vector3()
    const size = new THREE.Vector3(5, 2, 5)

    const gridOffset = 8
    const coordOffset = 5
    let coordX = -17.5
    let coordZ = -17.5

    for (let z = 0; z < gridOffset; z++) {
        for (let x = 0; x < gridOffset; x++) {
            const id = (z * gridOffset) + x + 1

            center.set(coordX, 1, coordZ)
            gridList.push(
                new Grid(id, center, size, scene)
            )
            centerCoords.push({ x: coordX, z: coordZ })
            gridEntityProxy.registerGrid(id)

            coordX += coordOffset
        }
        coordX = -17.5
        coordZ += coordOffset
    }

    const pos = new THREE.Vector3()
    for (let i = 0; i < centerCoords.length; i++) {
        pos.set(centerCoords[i].x, 1, centerCoords[i].z)
        const et = new Entity(i + 1, pos)
        gridEntityProxy.registerEntity(i + 1, et)
        scene.add(et.Mesh)
    }

    pos.set(14, 1, 6)
    const player = new THREE.Mesh(
        new THREE.BoxGeometry(),
        new THREE.MeshBasicMaterial({ color: 0xFF0000 })
    )
    player.position.copy(pos)
    scene.add(player)

    let alizees
    for (let grid of gridList) {
        const result = grid.query(pos)
        if (result) {
            alizees = gridEntityProxy.query(result)
        }
    }

    document.addEventListener('click', () => {
        const x = (Math.random() - 0.5) * 30
        const z = (Math.random() - 0.5) * 20
        
        pos.set(x, 1, z)
        player.position.copy(pos)

        for (let grid of gridList) {
            const result = grid.query(pos)
            if (result) {
                alizees = gridEntityProxy.query(result)
            }
        }
    })

    function animate() {
        renderer.render(scene, camera)
        requestAnimationFrame(animate)

        for (let a of alizees) {
            a.update()
        }

        stats.update()
    }
    animate()
})()

