import { getCamera } from './services/camera';
import { getLights } from './services/lights';
import { getRenderer } from './services/renderer';
import { getProduct } from './services/product';

let components = {
    scene: new THREE.Scene()
};

function animate() {
    window.requestAnimationFrame(animate);
    components.controls.update();
    components.renderer.render(components.scene, components.camera);
}

function onWindowResize() {
    components.camera.aspect = window.innerWidth / window.innerHeight;
    components.camera.updateProjectionMatrix();
    components.renderer.domElement.width = window.innerWidth;
    components.renderer.domElement.height = window.innerHeight;
    components.renderer.setSize(window.innerWidth, window.innerHeight);
}

function initializeControls() {
    components.controls = new THREE.OrbitControls( components.camera, components.renderer.domElement );
    components.controls.enableDamping = true;
    components.controls.dampingFactor = 0.25;
    components.controls.enableZoom = false;
}


export function initializeScene() {
    Promise.all([ getCamera(), getLights(), getRenderer(), getProduct() ])
        .then(([ camera, lights, renderer, product ]) => {
            Object.assign(components, { camera, lights, renderer, product });

            components.scene.add(components.camera);
            components.lights.forEach(light => components.scene.add(light));
            components.scene.add(components.product);

            let sceneDiv = document.getElementsByClassName('scene')[0];
            sceneDiv.appendChild(components.renderer.domElement);

            initializeControls();

            window.addEventListener('resize', onWindowResize);

            animate();
        })
        .catch(e => console.error(e));
}