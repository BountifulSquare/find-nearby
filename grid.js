import * as THREE from './vendors/three.module.js'

class Grid {
    constructor(id, center, size, scene) {
        this._id = id
        this._box3 = new THREE.Box3()
        this._box3.setFromCenterAndSize(center, size)
        this._offset = 8

        // const bh = new THREE.Box3Helper(this._box3)
        // scene.add(bh)
    }

    query(point) {

        if (this._box3.distanceToPoint(point) === 0) {
            const result = []
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const p = i * this._offset
                    result.push(this._id + p + j)
                }
            }

            return result
        }
        return false
    }
}

export default Grid