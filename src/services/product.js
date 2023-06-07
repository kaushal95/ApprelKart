

const fetchAllProducts = async () => await fetch('/api/products')

const fetchProduct = async (productId) => await fetch(`/api/products/${productId}`)

const fetchCategories = async () => await fetch(`/api/categories`)

export { fetchAllProducts, fetchProduct, fetchCategories }


