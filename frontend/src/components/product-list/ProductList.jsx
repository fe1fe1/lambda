import "./ProductList.scss";
import data from "../../data.js";

const ProductList = () => {
    return (
        <div>
            <div className="product-list-container">
                <div className="products">
                    {data.products.map((product) => (
                        <div className="product-card">
                            <div className="product-image">
                                <img
                                    className="product-card-img"
                                    src={product.image}
                                    alt={product.name}
                                />
                            </div>
                            <div className="product-card-info">
                                <h3>{product.name}</h3>
                                <div className="sub-info">
                                    <div className="price">
                                        <span>$500</span>
                                    </div>
                                </div>
                            </div>
                            <div className="overlay">
                                <p>cart</p>
                                <p>buy</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
