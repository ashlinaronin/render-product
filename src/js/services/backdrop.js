import { loadProductWithMaterials } from './product';

export function getBackdrop() {
    let backdrop = {
        shape: 'backdrop'
    };

    return loadProductWithMaterials(backdrop);
}
