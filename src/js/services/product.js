import { getLoadingManager } from './loading-manager';
import { getProductDetails } from './product-details';
import { loadImageToTexture } from './image-utils';
import { getQueryParam } from './routing';

const ASSET_BASE_PATH = 'assets/';
const IMAGE_BASE_URL = 'http://localhost:2000/';

let productPromise = new Promise(function(resolve, reject) {
    let debugOverride = getQueryParam('shape');

    if (debugOverride) {
        const mockProduct = {
            shape: debugOverride,
            customRegion: 'base',
            imageUrl: ''
        };
        resolve(loadProductWithMaterials(mockProduct));

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
            const absoluteImageUrl = IMAGE_BASE_URL + details.imageUrl;
            return setCustomMap(obj, details.customRegion, absoluteImageUrl);
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
                object.position.y = -5;
                resolve(object);
            }, console.log, reject);
        });
    });
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