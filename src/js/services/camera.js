const cameraParams = {
    fov: 45,
    aspect: window.innerWidth / window.innerHeight,
    near: 1,
    far: 1000
};

let cameraPromise = new Promise(function(resolve, reject) {
    let camera = new THREE.PerspectiveCamera(
        cameraParams.fov,
        cameraParams.aspect,
        cameraParams.near,
        cameraParams.far
    );
    camera.position.z = 25;
    resolve(camera);
});

export function getCamera() {
    return cameraPromise;
}
