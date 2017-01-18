import { getLoadingManager } from './loading-manager';
import { getProductDetails } from './product-details';

let objLoader;

let productPromise = new Promise(function(resolve, reject) {
    getLoadingManager().then(manager => {
        objLoader = new THREE.OBJLoader(manager);

        getProductDetails()
            .then(details => {
                const newestProduct = details[details.length-1];
                resolve(createProduct(newestProduct));
            })
            .catch(console.error);
    });
});

function createProduct(productDetails) {
    return new Promise(function(resolve, reject) {
        const productMaterial = new THREE.MeshLambertMaterial({
            color: productDetails.color,
            emissive: 0x000000,
            side: THREE.FrontSide
        });

        const assetPath = getAssetPath(productDetails.shape);

        objLoader.load(assetPath, object => {
            setObjectMaterial(object, productMaterial);
            object.position.y = -1.35;
            object.name = productDetails.shape;
            resolve(object);
        }, console.log, reject);
    });
}

function getAssetPath(productName) {
    return `assets/${productName}.obj`;
}

function setObjectMaterial(object, newMaterial) {
    object.traverse(child => {
        if (child instanceof THREE.Mesh) {
            child.material = newMaterial;
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