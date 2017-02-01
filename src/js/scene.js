import { getCamera } from './services/camera';
import { getLights } from './services/lights';
import { getRenderer } from './services/renderer';
import { getProduct } from './services/product';
import { getBackdrop } from './services/backdrop';
import { initializeControls, updateControlsOnResize, rotateObject } from './services/controls';
import { finishedLoading } from './services/loading-manager';

let components = {
    scene: new THREE.Scene()
};

const cameraTarget = new THREE.Vector3( 0, 0, 0 );

function animate() {
    window.requestAnimationFrame(animate);

    rotateObject(components.product);

    components.camera.lookAt( cameraTarget );

    components.renderer.render(components.scene, components.camera);
}

function onWindowResize() {
    components.camera.aspect = window.innerWidth / window.innerHeight;
    components.camera.updateProjectionMatrix();
    components.renderer.domElement.width = window.innerWidth;
    components.renderer.domElement.height = window.innerHeight;
    components.renderer.setSize(window.innerWidth, window.innerHeight);
    updateControlsOnResize();
}

export function initializeScene() {
    Promise.all([ getCamera(), getLights(), getRenderer(), getProduct(), getBackdrop() ])
        .then(([ camera, lights, renderer, product, backdrop ]) => {
            Object.assign(components, { camera, lights, renderer, product, backdrop });

            components.scene.add(components.backdrop);

            components.scene.add(components.camera);
            components.lights.forEach(light => components.scene.add(light));
            components.scene.add(components.product);

            let sceneDiv = document.getElementsByClassName('scene')[0];
            sceneDiv.appendChild(components.renderer.domElement);

            components.renderer.setFaceCulling( THREE.CullFaceNone );

            initializeControls(components.product.name);

            window.addEventListener('resize', onWindowResize);

            finishedLoading();

            animate();
        })
        .catch(e => console.error(e));
}