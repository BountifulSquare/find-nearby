import * as THREE from './vendors/three.module.js'

class Entity {
    static geo = new THREE.TetrahedronGeometry()
    static mat = new THREE.MeshPhongMaterial()

    constructor(id, position) {
        this._id = id
        this._mesh = new THREE.Mesh(Entity.geo, Entity.mat)
        this._mesh.position.copy(position)
    }

    get Mesh() {
        return this._mesh
    }

    update() {
        this._mesh.rotation.x += 0.025
        this._mesh.rotation.y += 0.025
    }
}

export default Entity