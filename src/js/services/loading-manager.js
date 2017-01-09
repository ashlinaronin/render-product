let loadingManager;

let loadingManagerPromise = new Promise(function(resolve, reject) {
   loadingManager = new THREE.LoadingManager();
   loadingManager.onProgress = onLoadingManagerProgress;
   resolve(loadingManager);
});

function onLoadingManagerProgress(item, loaded, total) {
    console.log(item, loaded, total);
}

export function getLoadingManager() {
    return loadingManagerPromise;
}
