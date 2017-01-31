import config from './config';

export function getProductDetails(readableId = '36eb83') {
    return new Promise(function (resolve, reject) {
        fetch(`${config.API_BASE_URL}/product-details/${readableId}`)
            .then(response => {
                if (response.status !== 200) {
                    reject(new Error('Product details: server error'));
                }

                resolve(response.json());
            })
            .catch(e => reject(new Error('Product details: fetch failed')));
    });
}