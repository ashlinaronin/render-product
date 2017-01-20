import { getLoadingManager } from './loading-manager';


const apiBaseUrl = 'https://www.googleapis.com/customsearch/v1?';
let queryParams = {
    key: 'AIzaSyDB5cOgPfH_VSA7yRcHiF3MGba4Wx_2a7c',
    cx: '014144397479220879650:sd7rzvq2hog',
    num: 1,
    fields: 'items(link,snippet)',
    searchType: 'image',
    fileType: 'jpg',
    imgSize: 'medium',
    alt: 'json',
    imgType: 'clipart'
};

function constructQueryParams(params) {
    let encodedParams = '';

    for (let key in params) {
        encodedParams += `${key}=${queryParams[key]}&`;
    }

    return encodedParams;
}

function constructRequestUrl(query) {
    queryParams.q = query;
    return apiBaseUrl + constructQueryParams(queryParams);
}

function fetchImageResults(query) {
    return new Promise(function (resolve, reject) {
        let requestUrl = constructRequestUrl(query);

        fetch(requestUrl).then(response => {
            if (response.status !== 200) {
                reject(new Error('Image Results: server error'));
            }

            resolve(response.json());
        });
    });
}

function onProgress(xhr) {
    console.log(`${ xhr.loaded / xhr.total * 100 }% loaded`);
}

function loadImageToTexture(imageUrl) {
    return new Promise(function (resolve, reject) {
        getLoadingManager()
            .then(loadingManager => {
                let textureLoader = new THREE.TextureLoader(loadingManager);
                textureLoader.load(
                    imageUrl,
                    texture => resolve(texture),
                    onProgress,
                    reject
                );
            });
    });
}

export function getImageForQuery(query) {
    return fetchImageResults(query)
        .then(json => json.items[0].link)
        .then(loadImageToTexture);
}