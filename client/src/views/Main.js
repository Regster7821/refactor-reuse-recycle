import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

export default () => {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then(res=>{
                setProducts(res.data);
                setLoaded(true);
            })
            .catch(err=>console.log('Error: ', err))
    }, [])
    const removeFromDom = productId => {
        setProducts(products.filter(product => product._id != productId));
    };
    const createProduct = product => {
        axios.post('http://localhost:8000/api/products', product)
            .then(res=>{
                setProducts([...products, res.data]);
            })
    }
    return(
        <>
            <h1>Create a product</h1>
            <ProductForm onSubmitProp={createProduct} initialTitle='' initialPrice='' initialDescription='' />
            <br/>
            {loaded && <ProductList products={products} removeFromDom={removeFromDom}/>}
        </>
    );
};