import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Router, Link } from '@reach/router';
import DeleteButton from '../components/DeleteButton';
export default props => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then(res => setProducts(res.data));
    }, [])
    const removeFromDom = productId => {
        setProducts(products.filter(product => product._id != productId))
    }
    return (
        <div>
            <h1>All products:</h1>
            {products.map((product, idx) => {
                return (
                    <p key={idx}>
                        <Link to={`/products/${product._id}`}>{product.title}</Link>
                       <DeleteButton productId={product._id} successCallback={()=>removeFromDom(product._id)}/>
                    </p>
                )
            })}
        </div>
    )
};
