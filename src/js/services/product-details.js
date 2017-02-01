import config from './config';
import { getQueryParam } from './routing';

export function getProductDetails() {
    return new Promise(function (resolve, reject) {

        const productReadableId = getQueryParam('id') || '36eb83';

        fetch(`${ config.API_BASE_URL }/product-details/${ productReadableId }`)
            .then(response => {
                if (response.status !== 200) {
                    reject(new Error('Product details: server error'));
                }

                resolve(response.json());
            })
            .catch(e => reject(new Error('Product details: fetch failed')));
    });
}