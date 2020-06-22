import '@/types/cart'

class Cart {
    public data: Array<ProductInCart> = [
        {
            id: 1,
            unitPrice: 149,
            name: 'Nike Air Zoom Pegasus 37',
            color: 'black',
            quantity: 2,
            thumbnail: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1e13dabf-e6c6-4430-aa51-1443d9eda9f9/air-zoom-pegasus-37-running-shoe-mwrTCc.jpg',
            discount: 0
        },
        {
            id: 2,
            unitPrice: 54.95,
            name: 'Nike Blazer Low',
            color: 'white',
            quantity: 1,
            thumbnail: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/afd3c8bf-64b2-4c56-acb2-f82ca7d554dd/blazer-low-shoe-FRdCCk.jpg',
            discount: 25
        },
    ];
}

export default class Api {
    public static getCartData(): any {
        const _cart = new Cart();
        return new Promise((resolve => {
                setTimeout(() => {
                    return resolve(_cart.data)
                }, Math.random() * 1000)
            })
        );
    }
}
