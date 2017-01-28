import { getLoadingManager } from './loading-manager';
import { getProductDetails } from './product-details';
import { loadImageToTexture } from './image-utils';
import { getQueryParam } from './routing';
import { getMetadata } from './product-metadata';

const ASSET_BASE_PATH = 'assets/';
const IMAGE_BASE_URL = 'http://localhost:4000/';

let productPromise = new Promise(function(resolve, reject) {
    let debugOverride = getQueryParam('shape');

    if (debugOverride) {
        const mockProduct = {
            shape: debugOverride,
            imageUrl: 'img/poop.jpg'
        };
        resolve(loadProductWithMaterialsAndCustomMap(mockProduct));

    } else {
        getProductDetails()
            .then(details => {
                const newestProduct = details[details.length-1];
                resolve(loadProductWithMaterials(newestProduct));
            })
            .catch(reject);
    }
});

function getObjLoader() {
    return getLoadingManager()
        .then(manager => new THREE.OBJLoader(manager));
}

function getMtlLoader() {
    return getLoadingManager()
        .then(manager => new THREE.MTLLoader(manager));
}

function loadProductFromJson(details) {
    return new Promise(function(resolve, reject) {
        let loader = new THREE.JSONLoader();
        loader.load(`assets/${details.shape}.json`, (geometry, materials) => {

            let mesh = new THREE.Mesh(geometry, new THREE.MultiMaterial(materials));
            resolve(mesh);

        }, console.log, reject);
    });
}

export function loadProductWithMaterials(details) {
    return loadMTL(details.shape)
        .then(materials => loadOBJ(details.shape, materials));
}

function loadProductWithMaterialsAndCustomMap(details) {
    return loadMTL(details.shape)
        .then(materials => loadOBJ(details.shape, materials))
        .then(obj => {
            let metadata = getMetadata(details.shape);
            if (!metadata.customRegion) return Promise.resolve(obj);

            const absoluteImageUrl = IMAGE_BASE_URL + details.imageUrl;
            return setCustomMap(obj, metadata.customRegion, absoluteImageUrl);
        });
}

function loadProductWithoutMaterials(details) {
    return loadOBJ(details.shape);
}

function loadOBJ(shape, materials) {
    return new Promise(function(resolve, reject) {
        getObjLoader().then(objLoader => {
            if (materials) {
                objLoader.setMaterials(materials);
            }

            objLoader.setPath(ASSET_BASE_PATH);
            objLoader.load(`${shape}.obj`, object => {
                object.name = shape;
                adjustObjectPositionAndScale(object);
                resolve(object);
            }, console.log, reject);
        });
    });
}

function adjustObjectPositionAndScale(object) {
    const metadata = getMetadata(object.name);
    if (metadata) {
        object.position.copy(metadata.position);
        object.scale.copy(metadata.scale);
        object.rotation.copy(metadata.rotation);
        window.object = object;
    }

    return object;
}

function loadMTL(shape) {
    return new Promise(function(resolve, reject) {
        getMtlLoader().then(mtlLoader => {
            mtlLoader.setPath(ASSET_BASE_PATH);
            mtlLoader.load(`${shape}.mtl`, materials => {
                materials.preload();
                resolve(materials);
            }, console.log, reject);
        });
    });
}


function setCustomMap(obj, regionName, imageUrl) {
    // TODO: refactor
    return loadImageToTexture(imageUrl)
        .then(texture => {
            let region = obj.children.find(r => r.material.name === regionName);
            let customMaterial;

            if (typeof region === 'undefined') {
                obj.children.forEach(child => {
                    if (child.material.type === 'MultiMaterial') {
                        customMaterial = child.material.materials.find(m => m.name === regionName);
                    } else if (child.material.name === regionName) {
                        customMaterial = child.material;
                    }
                });
            } else {
                customMaterial = region.material;
            }

            if (customMaterial) {
                updateMap(customMaterial, texture);
            }

            return Promise.resolve(obj);
        });
}

function updateMap(material, texture) {
    material.map = texture;
    material.needsUpdate = true;
}

export function getProduct() {
    return productPromise;
}