
class GridEntityProxy {
    constructor() {
        this._entities = {}
    }

    registerGrid(id) {
        this._entities[id] = []
    }

    registerEntity(id, entity) {
        this._entities[id].push(entity)
    }

    query(gridIdList) {
        const entities = []
        for (let id of gridIdList) {
            entities.push(...this._entities[id])
        }

        return entities
    }
}

export default GridEntityProxy