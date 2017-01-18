let rendererPromise = new Promise(function (resolve, reject) {
    let renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio || 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.setAttribute('id', 'renderer');

    resolve(renderer);
});

export function getRenderer() {
    return rendererPromise;
}