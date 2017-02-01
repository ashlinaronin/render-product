import { getLoadingManager } from './loading-manager';

export function loadImageToTexture(imageUrl) {
    return new Promise(function (resolve, reject) {
        getLoadingManager()
            .then(loadingManager => {
                let textureLoader = new THREE.TextureLoader(loadingManager);
                textureLoader.crossOrigin = '';
                textureLoader.load(
                    imageUrl,
                    texture => resolve(texture),
                    loadingEvent => console.log(loadingEvent),
                    error => reject(error)
                );
            });
    });
}