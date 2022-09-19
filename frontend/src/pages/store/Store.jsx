import React from "react";
import ProductList from "../../components/product-list/ProductList";
import "./Store.scss";

const Store = () => {
    return (
        <div>
            <div className="store-container">
                <ProductList />
            </div>
        </div>
    );
};

export default Store;
