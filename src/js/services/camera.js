const cameraParams = {
    fov: 90,
    aspect: window.innerWidth / window.innerHeight,
    near: 10,
    far: 10000
};

let cameraPromise = new Promise(function(resolve, reject) {
    let camera = new THREE.PerspectiveCamera(
        cameraParams.fov,
        cameraParams.aspect,
        cameraParams.near,
        cameraParams.far
    );
    camera.position.z = 300;
    resolve(camera);
});

export function getCamera() {
    return cameraPromise;
}
