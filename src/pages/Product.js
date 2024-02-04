import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
const obj = {
  _id: "f0079bfa-fbbc-49b5-888e-2db73ea22156",
  name: "Pullover",
  price: 800,
  currency: "₹",
  rating: 4,
  image:
    "https://res.cloudinary.com/dxwheexnk/image/upload/v1685643136/mens-clothes/pexels-photo-15692115_tqbkku.webp",
  description:
    "Pullover - This soft lambswool jumper is knitted in Scotland, using yarn from one of the world's oldest spinners based in Fife. Once knitted, the garment is washed in Scottish spring water to make it beautifully soft.",
  categoryName: "Men",
};
export default function Product() {
  const {
    productState: { productDetail },
  } = useProducts();
  console.log(productDetail);
  return (
    <main className="layout-single-product">
      <div className="root-container">
        <div className="product-container">
          <div className="product-content">
            <div className="product-gallery">
              <div className="gallery-img-container">
                <img src={productDetail.image} alt="product-img" />
              </div>
            </div>
          </div>
          <div className="product-detail">
            <div className="product-header-container">
              <h1>{productDetail.name}</h1>
            </div>
            <div className="product-price-container">
              <span>{productDetail.currency}</span>
              <span>{productDetail.price}</span>
            </div>
          </div>
        </div>
        <div className="product-attribute">
          <div className="attribute-details">
            <div className="attribute-detail-container">
              <h4>Sustainability</h4>
              <p>
                We design our products to look good and to be used on a daily
                basis. And our aim is to inspire people to live with few
                timeless objects made to last. This is why quality over quantity
                is a cornerstone of our ethos and we have no interest in trends
                or seasonal collections.
              </p>
            </div>
          </div>
          <div className="attribute-img-container">
            <img
              src="https://gatsby-ecommerce-theme.netlify.app/cloth.png"
              alt="sustainablityimage"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
