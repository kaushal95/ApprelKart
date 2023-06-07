import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Men",
    description:
      "literature in the form of prose, especially novels, that describes imaginary events and people",
    image: "https://res.cloudinary.com/dxwheexnk/image/upload/v1685779677/ecommerce-categories/collection1_tbnsof.png"
  },
  {
    _id: uuid(),
    categoryName: "Women",
    description:
      "Non-fiction is writing that gives information or describes real events, rather than telling a story.",
    image: "https://res.cloudinary.com/dxwheexnk/image/upload/v1685779677/ecommerce-categories/collection2_ilmgrj.png"
  },
  {
    _id: uuid(),
    categoryName: "Kids",
    description:
      "Meant to cause discomfort and fear for both the character and readers, horror writers often make use of supernatural and paranormal elements in morbid stories that are sometimes a little too realistic.",
    image: "https://res.cloudinary.com/dxwheexnk/image/upload/c_scale,h_600,w_660/v1685780094/ecommerce-categories/collection3.webp"
    // "https://res.cloudinary.com/dxwheexnk/image/upload/v1685780094/ecommerce-categories/collection3.webp"
  },
  {
    _id: uuid(),
    categoryName: "Accessories",
    description:
      "Meant to cause discomfort and fear for both the character and readers, horror writers often make use of supernatural and paranormal elements in morbid stories that are sometimes a little too realistic.",
    image: "https://res.cloudinary.com/dxwheexnk/image/upload/c_scale,h_600,w_660/v1685779937/ecommerce-categories/collection4.webp"
    // "https://res.cloudinary.com/dxwheexnk/image/upload/v1685779937/ecommerce-categories/collection4.webp"
  },
];
