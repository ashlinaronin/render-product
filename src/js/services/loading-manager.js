let loadingManagerPromise = new Promise(function(resolve, reject) {
   let loadingManager = new THREE.LoadingManager();
   loadingManager.onProgress = onLoadingManagerProgress;
   resolve(loadingManager);
});

function onLoadingManagerProgress(item, loaded, total) {
    console.log(item, loaded, total);
}


export function finishedLoading() {
    document.querySelector('.loading').classList.add('hidden');
}

export function onError() {
    const loading = document.querySelector('.loading');
    const scene = document.querySelector('.scene');
    const error = document.querySelector('.error');
    const body = document.querySelector('body');
    body.removeChild(loading);
    body.removeChild(scene);

    error.classList.remove('hidden');
}

export function getLoadingManager() {
    return loadingManagerPromise;
}
