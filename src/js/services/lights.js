let lightsPromise = new Promise(function(resolve, reject) {
    const pointLight = new THREE.PointLight(0xffffff, 10);
    const ambientLight = new THREE.AmbientLight(0x404040, 10);
    resolve([pointLight, ambientLight]);
});

export function getLights() {
    return lightsPromise;
}
