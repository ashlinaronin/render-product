let lightsPromise = new Promise(function(resolve, reject) {
    const leftPoint = new THREE.PointLight(0xffffff, 1.4);
    leftPoint.position.set(-10, 5, -2);

    const rightPoint = new THREE.PointLight(0xffffff, 1.4);
    rightPoint.position.set(10, 5, -2);

    resolve([leftPoint, rightPoint]);
});

export function getLights() {
    return lightsPromise;
}
