import { getCamera } from './services/camera';
import { getLights } from './services/lights';
import { getRenderer } from './services/renderer';
import { getProduct, setProductMaterial } from './services/product';

const cubeUrls = [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg',
    'posz.jpg', 'negz.jpg' ];

let components = {
    scene: new THREE.Scene()
};

function animate() {
    window.requestAnimationFrame(animate);

    let timer = -0.0002 * Date.now();
    components.pointLight.position.x = 1700 * Math.cos( timer );
    components.pointLight.position.z = 1700 * Math.sin( timer );

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

function addReflectionCube() {
    let reflectionCube = new THREE.CubeTextureLoader()
        .setPath( 'assets/NiagaraFalls2/' )
        .load( cubeUrls );
    reflectionCube.format = THREE.RGBFormat;
    components.scene.background = reflectionCube;

    let newProductMaterial = new THREE.MeshLambertMaterial(
        {
            color: 0xff6600,
            envMap: reflectionCube,
            combine: THREE.MixOperation,
            reflectivity: 0.3
        }
    );

    setProductMaterial(newProductMaterial);
}

function addRefractionCube() {
    let refractionCube = new THREE.CubeTextureLoader()
        .setPath( 'assets/NiagaraFalls2/' )
        .load( cubeUrls );
    refractionCube.mapping = THREE.CubeRefractionMapping;
    refractionCube.format = THREE.RGBFormat;
    components.scene.background = refractionCube;

    let newProductMaterial = new THREE.MeshLambertMaterial(
        {
            color: 0xffee00,
            envMap: refractionCube,
            refractionRatio: 0.95
        }
    );

    setProductMaterial(newProductMaterial);
}

export function initializeScene() {
    Promise.all([getCamera(), getLights(), getRenderer(), getProduct()])
        .then(([camera, lights, renderer, product]) => {
            components.camera = camera;
            components.lights = lights;
            components.renderer = renderer;
            components.product = product;

            components.scene.add(components.camera);
            components.lights.forEach(light => components.scene.add(light));
            components.pointLight = components.lights.find(light => light.type === "PointLight");
            components.scene.add(components.product);

            // addReflectionCube();

            addRefractionCube();

            let sceneDiv = document.getElementsByClassName('scene')[0];
            sceneDiv.appendChild(components.renderer.domElement);

            initializeControls();

            window.addEventListener('resize', onWindowResize);

            animate();
        })
        .catch(e => console.error(e));
}