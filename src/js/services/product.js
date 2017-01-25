import { getLoadingManager } from './loading-manager';
import { getProductDetails } from './product-details';
import { loadImageToTexture } from './image-utils';
import { getQueryParam } from './routing';

const ASSET_BASE_PATH = 'assets/';
const IMAGE_BASE_URL = 'http://localhost:2000/';

let objLoader, mtlLoader;

let productPromise = new Promise(function(resolve, reject) {
    getLoadingManager().then(manager => {
        objLoader = new THREE.OBJLoader(manager);
        mtlLoader = new THREE.MTLLoader(manager);

        let debugOverride = getQueryParam('shape');

        if (debugOverride) {
            const mockProduct = {
                shape: debugOverride,
                customRegion: 'base',
                imageUrl: ''
            };

            resolve(createProductWithoutMaterials(mockProduct));
        }

        getProductDetails()
            .then(details => {
                const newestProduct = details[details.length-1];
                resolve(createProductWithMaterials(newestProduct));
            })
            .catch(reject);
    });
});

function createProductWithMaterials(details) {
    return loadMTL(details.shape)
        .then(materials => loadOBJ(details.shape, materials))
        .then(obj => {
            const absoluteImageUrl = IMAGE_BASE_URL + details.imageUrl;
            return setCustomMap(obj, details.customRegion, absoluteImageUrl);
        });
}

function createProductWithoutMaterials(details) {
    return loadOBJ(details.shape);
}

function loadOBJ(shape, materials) {
    return new Promise(function(resolve, reject) {
        if (materials) {
            objLoader.setMaterials(materials);
        }

        objLoader.setPath(ASSET_BASE_PATH);
        objLoader.load(`${shape}.obj`, object => {
            object.name = shape;
            window.product = object;

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


function setCustomMap(obj, regionName, imageUrl) {
    return loadImageToTexture(imageUrl)
        .then(texture => {
            obj.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    let multiMaterial = child.material;
                    let regionMaterial = multiMaterial.materials.find(m => m.name === regionName);
                    regionMaterial.map = texture;
                    regionMaterial.needsUpdate = true;
                }
            });
            return Promise.resolve(obj);
        });
}

export function getProduct() {
    return productPromise;
}