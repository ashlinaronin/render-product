const metadata = {
    default: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Euler(0, 0, 0)
    },
    abacus: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(0.5, 0.5, 0.5),
        rotation: new THREE.Euler(0, 90 * Math.PI / 180, 0)
    },
    backdrop: {
        position: new THREE.Vector3(0, -10, 0),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Euler(0, 0, 0)
    },
    basketball: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Euler(0, 0, 0)
    },
    birdcage: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Euler(0, 0, 0)
    },
    bubbler: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Euler(0, 0, 0)
    },
    carfreshener: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Euler(0, 0, 0)
    },
    choker: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Euler(0, 0, 0)
    },
    footballwithcase: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Euler(0, 0, 0)
    },
    massager: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(0.8, 0.8, 0.8),
        rotation: new THREE.Euler(0, 0, 0)
    },
    mug: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1.5, 1.5, 1.5),
        rotation: new THREE.Euler(0, 90 * Math.PI/180, 0)
    },
    phonecase: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Euler(0, 0, 0)
    },
    snuggy: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(0.25, 0.25, 0.25),
        rotation: new THREE.Euler(0, 0, 0)
    },
    snuggie_alternate: {
        position: new THREE.Vector3(0, -9, 0),
        scale: new THREE.Vector3(0.25, 0.25, 0.25),
        rotation: new THREE.Euler(0, 0, 0)
    },
    tshirt: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Euler(0, 0, 0)
    }
};

export function getMetadata(productName) {
    return metadata.hasOwnProperty(productName) ? metadata[productName] : metadata.default;
}