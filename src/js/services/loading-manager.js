let loadingManagerPromise = new Promise(function(resolve, reject) {
   let loadingManager = new THREE.LoadingManager();
   loadingManager.onProgress = onLoadingManagerProgress;
   resolve(loadingManager);
});

function onLoadingManagerProgress(item, loaded, total) {
    console.log(item, loaded, total);
}

export function getLoadingManager() {
    return loadingManagerPromise;
}
