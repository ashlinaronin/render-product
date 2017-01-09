import { getLoadingManager } from './loading-manager';
import { getProductDetails } from './product-details';

let objLoader;
const cactusMaterial = new THREE.MeshLambertMaterial({
    color: 0x2194ce,
    emissive: 0x000000,
    side: THREE.FrontSide
});

let productPromise = new Promise(function(resolve, reject) {
    getLoadingManager().then(manager => {
        objLoader = new THREE.OBJLoader(manager);

        getProductDetails().then(details => console.log(details));

        resolve(createBigCactus());
    });
});

function createBigCactus(resolve, reject) {
    return new Promise(function(resolve, reject) {
        objLoader.load('assets/cactus.obj', object => {
            object.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    child.material = cactusMaterial;
                }
            });
            object.position.y = -1.35;
            object.name = 'cactus';
            resolve(object);
        });
    });
}


export function getProduct() {
    return productPromise;
}