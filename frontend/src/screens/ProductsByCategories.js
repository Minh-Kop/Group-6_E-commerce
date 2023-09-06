import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useRouteLoaderData } from "react-router-dom";

function ProductsByCategories() {
  const { categoryId } = useParams();
  const books = useRouteLoaderData();
  console.log(books);
  return <div className="category-vontainer">{categoryId}</div>;
}

export default ProductsByCategories;

export const ProductsByCategoriesLoaders = async ({ params }) => {
  const client = axios.create({
    baseURL: "http://127.0.0.1:3001/",
  });

  let data = [];
  const { categoryId } = params;
  const cateUrl = "api/books?categoryId=" + categoryId;
  client
    .get(cateUrl)
    .then((res) => {
      console.log(res);
      data = res.data;
    })
    .catch((err) => console.log(err));

  return data;
};
