import fetch from 'node-fetch';

// Leer argumentos de consola
const [, , method, resource, ...args] = process.argv;
const BASE_URL = 'https://fakestoreapi.com';

const getAllProducts = async () => {
    fetch(`${BASE_URL}/products`)
        .then(response => response.json())
        .then(data => console.log(data))
};

const getProductById = async (id) => {
    fetch(`${BASE_URL}/products/${id}`)
        .then(response => response.json())
        .then(data => console.log(data));
};

const createProduct = async (title, price, category) => {
    const product = { title: title, price: price, category: category };
    fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
        .then(data => console.log(data));
};

const deleteProduct = async (id) => {
    fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => console.log(data));
};

const main = async () => {
    try {
        if (method === 'GET') {
            if (resource.startsWith('products/')) {
                const id = resource.split('/')[1];
                await getProductById(id);
            } else if (resource === 'products') {
                await getAllProducts();
            } else {
                console.log('Ruta GET no válida');
            }
        }

        else if (method === 'POST' && resource === 'products') {
            const [title, price, category] = args;
            if (!title || !price || !category) {
                console.log('Faltan argumentos para crear producto');
                return;
            }
            await createProduct(title, price, category);
        }

        else if (method === 'DELETE' && resource.startsWith('products/')) {
            const id = resource.split('/')[1];
            await deleteProduct(id);
        }

        else {
            console.log('Comando no reconocido.');
        }
    } catch (err) {
        console.error('Error:', err.message);
    }
};

main();