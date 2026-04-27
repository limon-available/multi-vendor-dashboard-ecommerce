import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { get_products } from "../../store/Reducers/productReducer";

const DiscountProducts = () => {
  const dispatch = useDispatch();
  const { products, totalProduct } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  useEffect(() => {
    dispatch(
      get_products({
        parPage,
        page: currentPage,
        searchValue,
      }),
    );
  }, [parPage, currentPage, searchValue, dispatch]);

  // 🔥 Filter discount products
  const discountProducts = products.filter((p) => p.discount > 0);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[#000000] font-semibold text-lg mb-3">
        Discount Products
      </h1>

      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />

        <div className="relative overflow-x-auto mt-5">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm uppercase border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">No</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Brand</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Discount</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {discountProducts.length > 0 ? (
                discountProducts.map((d, i) => (
                  <tr key={i}>
                    <td className="py-1 px-4">{i + 1}</td>

                    <td className="py-1 px-4">
                      <img
                        className="w-[45px] h-[45px]"
                        src={d.images[0]}
                        alt=""
                      />
                    </td>

                    <td className="py-1 px-4">{d.name?.slice(0, 15)}...</td>

                    <td className="py-1 px-4">{d.category}</td>
                    <td className="py-1 px-4">{d.brand}</td>

                    <td className="py-1 px-4">${d.price}</td>

                    <td className="py-1 px-4">%{d.discount}</td>

                    <td className="py-1 px-4">{d.stock}</td>

                    <td className="py-1 px-4">
                      <div className="flex gap-4">
                        <Link
                          to={`/seller/dashboard/edit-product/${d._id}`}
                          className="p-[6px] bg-yellow-500 rounded"
                        >
                          <FaEdit />
                        </Link>

                        <Link className="p-[6px] bg-green-500 rounded">
                          <FaEye />
                        </Link>

                        <Link className="p-[6px] bg-red-500 rounded">
                          <FaTrash />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-5">
                    No Discount Products Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 🔥 Pagination */}
        {totalProduct > parPage && (
          <div className="w-full flex justify-end mt-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalProduct}
              parPage={parPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountProducts;
