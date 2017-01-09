const apiBaseUrl = 'http://localhost:2000';
const productId = 'testproductid';

export function getProductDetails(productId) {
    return new Promise(function (resolve, reject) {
        fetch(`${apiBaseUrl}/product-details/${productId}`).then(response => {
            if (response.status !== 200) {
                reject(new Error('Error getting product details from server'));
            }

            resolve(response.json());
        });
    });;
}