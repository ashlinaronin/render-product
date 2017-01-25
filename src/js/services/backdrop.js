import { loadProductWithMaterials } from './product';

export function getBackdrop() {
    let backdrop = {
        shape: 'backdrop'
    };

    return loadProductWithMaterials(backdrop).then(obj => {
        obj.position.y = -7;
        return obj;
    });
}
