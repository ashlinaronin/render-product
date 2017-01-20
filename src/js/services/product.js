import { getLoadingManager } from './loading-manager';
import { getProductDetails } from './product-details';

const ASSET_BASE_PATH = 'assets/';

let objLoader, mtlLoader;

let productPromise = new Promise(function(resolve, reject) {
    getLoadingManager().then(manager => {
        objLoader = new THREE.OBJLoader(manager);
        mtlLoader = new THREE.MTLLoader(manager);

        getProductDetails()
            .then(details => {
                const newestProduct = details[details.length-1];
                resolve(createProduct(newestProduct));
            })
            .catch(reject);
    });
});

function createProduct(details) {
    return loadMTL(details.shape)
        .then(materials => {
            return loadOBJ(details.shape, materials);
        });
}

function loadOBJ(shape, materials) {
    return new Promise(function(resolve, reject) {
        if (materials) {
            objLoader.setMaterials(materials);
        }

        objLoader.setPath(ASSET_BASE_PATH);
        objLoader.load(`${shape}.obj`, object => {
            object.name = shape;
            resolve(object);
        }, console.log, reject);
    });
}

function loadMTL(shape) {
    return new Promise(function(resolve, reject) {
        mtlLoader.setPath(ASSET_BASE_PATH);
        mtlLoader.load(`${shape}.mtl`, materials => {
            materials.preload();
            resolve(materials);
        }, console.log, reject);
    });
}

function setObjectMaterial(object, newMaterial) {
    object.traverse(child => {
        if (child instanceof THREE.Mesh) {
            child.material = newMaterial;
            child.material.needsUpdate = true;
        }
    });
}

export function getProduct() {
    return productPromise;
}

export function setProductMaterial(newMaterial) {
    return getProduct().then(product => {
        setObjectMaterial(product, newMaterial);
        newMaterial.needsUpdate = true;
    });
}