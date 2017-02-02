// adapted from https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_text.html
import { getMetadata } from './product-metadata';

let sceneDiv;

let targetRotation = 0;
let targetRotationOnMouseDown = 0;
let mouseX = 0;
let mouseXOnMouseDown = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function onDocumentMouseDown( event ) {
    event.preventDefault();
    sceneDiv.addEventListener( 'mousemove', onDocumentMouseMove, false );
    sceneDiv.addEventListener( 'mouseup', onDocumentMouseUp, false );
    sceneDiv.addEventListener( 'mouseout', onDocumentMouseOut, false );
    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;
}
function onDocumentMouseMove( event ) {
    mouseX = event.clientX - windowHalfX;
    targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.008;
}
function onDocumentMouseUp( event ) {
    sceneDiv.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    sceneDiv.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    sceneDiv.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}
function onDocumentMouseOut( event ) {
    sceneDiv.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    sceneDiv.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    sceneDiv.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}
function onDocumentTouchStart( event ) {
    if ( event.touches.length == 1 ) {
        event.preventDefault();
        mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;
    }
}
function onDocumentTouchMove( event ) {
    if (event.touches.length == 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.01;
    }
}

export function initializeControls(productName) {
    let productMetadata = getMetadata(productName);
    targetRotation = productMetadata.rotation.y;
    targetRotationOnMouseDown = productMetadata.rotation.y;

    sceneDiv = document.querySelector('.scene');

    sceneDiv.addEventListener( 'mousedown', onDocumentMouseDown, false );
    sceneDiv.addEventListener( 'touchstart', onDocumentTouchStart, false );
    sceneDiv.addEventListener( 'touchmove', onDocumentTouchMove, false );
}

export function rotateObject(object) {
    object.rotation.y += ( targetRotation - object.rotation.y ) * 0.05;
}

export function updateControlsOnResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
}