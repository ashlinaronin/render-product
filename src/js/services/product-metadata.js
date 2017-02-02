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
    basketball_v2: {
        position: new THREE.Vector3(0, 2, 0),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Euler(0, 0, 0),
        customRegion: '09___Default'
    },
    // good one
    birdcagev2: {
        position: new THREE.Vector3(0, 5, 0),
        scale: new THREE.Vector3(0.5, 0.5, 0.5),
        rotation: new THREE.Euler(0, 0, 0),
        customRegion: 'wire_028149177'
    },
    bubblerv3: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(2.25, 2.25, 2.25),
        rotation: new THREE.Euler(0, 0, 0),
        customRegion: '08___Default'
    },
    chokerv6: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Euler(0, 0, 0),
        customRegion: '_chokerv408___Default'
    },
    footballv2: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Euler(0, 0, 0),
        customRegion: '09___Default'
    },
    massager: {
        position: new THREE.Vector3(0, 1, 0),
        scale: new THREE.Vector3(1, 1, 1),
        rotation: new THREE.Euler(0, 0, 0),
        customRegion: 'base'
    },
    mug: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1.8, 1.8, 1.8),
        rotation: new THREE.Euler(0, 90 * Math.PI/180, 0),
        customRegion: 'wire_176026026'
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
    't-shirt_v2': {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(0.5, 0.5, 0.5),
        rotation: new THREE.Euler(0, 0, 0),
        customRegion: '08___Default'
    },
    teainfuserv2: {
        position: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(0.25, 0.25, 0.25),
        rotation: new THREE.Euler(0, 0, 0),
        customRegion: '03___Default'
    }
};

export function getMetadata(productName) {
    return metadata.hasOwnProperty(productName) ? metadata[productName] : metadata.default;
}