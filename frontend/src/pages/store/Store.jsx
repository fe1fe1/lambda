import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProductCard from "../../components/peoduct-card/ProductCard.jsx";
import items from "../../data.js";
import "./Store.scss";

const Store = () => {
    const { data, error, isLoading } = useQuery("products", () => {
        return items;
    });
    console.log(data);
    return (
        <div>
            <div className="store-container">
                <div className="sidebar-search-container"></div>
                <ul>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                </ul>
                <div className="product-list-container">
                    <div className="products">
                        {data.products.map((product) => (
                            <ProductCard product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Store;
