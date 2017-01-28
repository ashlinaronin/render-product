let lightsPromise = new Promise(function(resolve, reject) {
    const leftPoint = new THREE.PointLight(0xffffff, 1.4, 100, 2);
    leftPoint.position.set(-15, -5, 10);

    const rightPoint = new THREE.PointLight(0xffffff, 1.0, 100, 2);
    rightPoint.position.set(15, 5, 10);

    const centerPoint = new THREE.PointLight(0xffffff, 0.35, 100, 2);
    centerPoint.position.set(0, 5, 0);

    resolve([leftPoint, rightPoint, centerPoint]);
});

export function getLights() {
    return lightsPromise;
}
