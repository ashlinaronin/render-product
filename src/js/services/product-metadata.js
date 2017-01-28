const metadata = {
    default: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Euler(0, 0, 0)
    },
    abacus: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(0.5, 0.5, 0.5),
        rotation: new THREE.Euler(0, 90 * Math.PI / 180, 0),
        customRegion: 'wire_198225087'
    },
    backdrop: {
        position: new THREE.Vector3(0, -7, 0),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Euler(0, 0, 0)
    },
    basketball: {
        position: new THREE.Vector3(0, -5, 0),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Euler(0, 0, 0),
        customRegion: 'Material__3'
    },
    birdcage: {
        position: new THREE.Vector3(0, -5, 0),
        scale: new THREE.Vector3(0.5, 0.5, 0.5),
        rotation: new THREE.Euler(0, 0, 0)
    },
    bubbler: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Euler(0, 0, 0)
    },
    carfreshener: {
        position: new THREE.Vector3(0, 1, 0),
        scale: new THREE.Vector3(4, 4, 4),
        rotation: new THREE.Euler(90 * Math.PI / 180, 0, 0, 'YXZ'),
        customRegion: 'wire_177027088'
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
        position: new THREE.Vector3(0, 1, 0),
        scale: new THREE.Vector3(1.5, 1.5, 1.5),
        rotation: new THREE.Euler(0, 0, 0),
        customRegion: 'base'
    },
    mug: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(2.0, 2.0, 2.0),
        rotation: new THREE.Euler(0, 90 * Math.PI/180, 0),
        customRegion: 'wire_176026026'
    },
    phonecase: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Euler(0, 0, 0)
    },
    snuggy: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(0.3, 0.3, 0.3),
        rotation: new THREE.Euler(0, 0, 0),
        customRegion: '02___Default'
    },
    snuggie_alternate: {
        position: new THREE.Vector3(0, -9, 0),
        scale: new THREE.Vector3(0.25, 0.25, 0.25),
        rotation: new THREE.Euler(0, 0, 0),
        customRegion: '01___Default'
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