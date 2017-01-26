let lightsPromise = new Promise(function(resolve, reject) {
    const leftPoint = new THREE.PointLight(0xffffff, 1.4, 100, 2);
    leftPoint.position.set(-15, -5, 10);

    const rightPoint = new THREE.PointLight(0xffffff, 1.4, 100, 2);
    rightPoint.position.set(15, 5, 10);

    resolve([leftPoint, rightPoint]);
});

export function getLights() {
    return lightsPromise;
}
