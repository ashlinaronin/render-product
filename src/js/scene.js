import { getCamera } from './services/camera';
import { getLights } from './services/lights';
import { getRenderer } from './services/renderer';

export function initializeScene() {
    let scene = new THREE.Scene();

    Promise.all([getCamera(), getLights(), getRenderer()])
        .then(([camera, lights, renderer]) => {
            scene.add(camera);
            lights.forEach(light => scene.add(light));

            let sceneDiv = document.getElementsByClassName('scene')[0];
            sceneDiv.appendChild(renderer.domElement);

            console.log(renderer);
        })
        .catch(e => console.error(e));
}