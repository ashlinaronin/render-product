const apiBaseUrl = 'http://localhost:2000';

export function getProductDetails(phoneNumber = '+15093414961') {
    return new Promise(function (resolve, reject) {
        fetch(`${apiBaseUrl}/product-details/${phoneNumber}`)
            .then(response => {
                if (response.status !== 200) {
                    reject(new Error('Product details: server error'));
                }

                resolve(response.json());
            })
            .catch(e => reject(new Error('Product details: fetch failed')));
    });
}