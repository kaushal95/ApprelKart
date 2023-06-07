import { useParams } from "react-router-dom"
import { useProducts } from "../context/ProductContext"

export default function Product() {
    const { productState } = useProducts()
    return (
        <main className="layout-single-product">
            <div className="root-container">
                <div className="product-container">
                    <div className="product-content">
                        <div className="product-gallery">
                            <div className="gallery-img-container">
                                <img src={productState.productDetail.image} alt='product-img'/>
                            </div>
                        </div>
                        <div className="product-detail">

                        </div>
                    </div>
                </div>
                <div className="product-attribute">
                    <div className="attribute-details">
                        <div class="attribute-detail-container"><h4>Sustainability</h4><p>We design our products to look good and to be used on a daily basis. And our aim is to inspire people to live with few timeless objects made to last. This is why quality over quantity is a cornerstone of our ethos and we have no interest in trends or seasonal collections.</p></div>
                    </div>
                    <div className="attribute-img-container">
                        <img src="https://gatsby-ecommerce-theme.netlify.app/cloth.png" alt='sustainablityimage' />
                    </div>
                </div>
            </div>
        </main>
    )
}