import { getLoadingManager } from './loading-manager';
import { getProductDetails } from './product-details';
import { loadImageToTexture } from './image-utils';

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
        .then(materials => loadOBJ(details.shape, materials))
        .then(obj => setCustomMap(obj, details.customRegion, details.imageUrl));
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