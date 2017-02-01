let loadingManagerPromise = new Promise(function(resolve, reject) {
   let loadingManager = new THREE.LoadingManager();
   loadingManager.onProgress = onLoadingManagerProgress;
   resolve(loadingManager);
});

function onLoadingManagerProgress(item, loaded, total) {
    console.log(item, loaded, total);
}

export function finishedLoading() {
    const loadingDiv = document.querySelector('.loading');
    loadingDiv.classList.add('hidden');
}

export function getLoadingManager() {
    return loadingManagerPromise;
}
