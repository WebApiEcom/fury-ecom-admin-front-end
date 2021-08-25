import axios from "axios";

// GET ALL PRODUCTS
export function requestGetProducts() {
  return axios.request({
    method: "get",
    url: "http://localhost:4000/fury/admin/products",
  });
}

// await axios
//   .post("http://localhost:4000/fury/admin/products", {
//     name: productName,
//     qty: productQty,
//     imgUrl: downloadURL,
//     category: productType,
//     isActive: productIsActive,
//     prices: {
//       price: productPrice,
//       discount: productDiscount,
//     },
//   })

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

  // return axios.request({
  //   method: "post",
  //   url: "http://localhost:4000/fury/admin/products",
  //   body: {
  //     name: product.productName,
  //     qty: product.productQty,
  //     imgUrl: product.downloadURL,
  //     category: product.productType,
  //     isActive: product.productIsActive,
  //     prices: {
  //       price: product.productPrice,
  //       discount: product.productDiscount,
  //     },
  //   },
  // });
}

// GET SPECIFIC PRODUCT
export function requestSpecificProduct(id) {
  return axios.request({
    method: "get",
    url: `http://localhost:4000/fury/admin/products/${id}`,
  });
}
