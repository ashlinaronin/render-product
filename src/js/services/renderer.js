let rendererPromise = new Promise(function (resolve, reject) {
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.setAttribute('id', 'renderer');

    resolve(renderer);
});

export function getRenderer() {
    return rendererPromise;
}