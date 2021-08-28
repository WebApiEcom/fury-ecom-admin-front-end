import axios from "axios";

// GET ALL PRODUCTS
export function requestGetProducts() {
  return axios.request({
    method: "get",
    url: "http://localhost:4000/fury/admin/products",
  });
}

// CREATE A PRODUCT
export function requestCreateProduct(product) {
  console.log("request to api: ", product);

  return axios.post("http://localhost:4000/fury/admin/products", {
    name: product.productName,
    qty: product.productQty,
    imgUrl: product.downloadURL,
    category: product.productType,
    isActive: product.productIsActive,
    prices: {
      price: product.productPrice,
      discount: product.productDiscount,
    },
    description: product.productDescription,
    weight: product.productWeight,
  });
}

// GET SPECIFIC PRODUCT
export function requestSpecificProduct(id) {
  return axios.request({
    method: "get",
    url: `http://localhost:4000/fury/admin/products/${id}`,
  });
}
