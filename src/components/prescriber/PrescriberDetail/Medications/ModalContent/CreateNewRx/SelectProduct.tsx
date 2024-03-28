import TextInput from "@components/widgets/TextInput";
import { IProducts } from "@shared/types/product";
import React from "react";

type ISelectProduct = {
  data: any;
  selectedData: IProducts;
  setSelectedData: React.Dispatch<any>;
  filteredProducts: IProducts[];
  isLoading: boolean;
  searchquery: string;
  setSearchquery: React.Dispatch<any>;
};
const SelectProduct = ({
  data,
  selectedData,
  setSelectedData,
  filteredProducts,
  isLoading,
  searchquery,
  setSearchquery,
}: ISelectProduct) => {
  return (
    <>
      <div className="col-12">
        <div className="row align-items-end pb-3 gap-3 gap-md-0">
          <div className="col-md-4 order-2 order-md-1">
            <div className="label_name">Search</div>
            <div className="input_wrapper">
              <TextInput
                className="input_wrapper-outline"
                placeholder="Search products"
                value={searchquery}
                onChange={(e) => {
                  setSearchquery(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-md-8 d-flex justify-content-start justify-content-md-end order-1 order-md-2">
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#newRecipe"
              data-dismiss="modal"
              type="button"
            >
              New Recipe
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <ul
          className="overflow-y-auto list-group d-block d-md-none"
          style={{ maxHeight: "16rem" }}
        >
          {!isLoading && data.length
            ? filteredProducts.map((product, index) => (
                <li
                  value={product.id}
                  key={index}
                  className={`list-group-item py-1${product.id === selectedData?.id ? " active" : ""}`}
                  onClick={(e) => {
                    setSelectedData(data.find((i: any) => i.id === product.id));
                  }}
                >
                  <small>
                    {`${product.name} ${product.strength} ${product.units}`}
                  </small>
                </li>
              ))
            : ""}
        </ul>
        <select
          className="form-select d-none d-md-block"
          aria-label="Default select example"
          size={15}
          onChange={(e) => {
            setSelectedData(
              data.find((i: any) => i.id === parseInt(e.target.value))
            );
          }}
          value={selectedData?.id}
        >
          {!isLoading && data.length
            ? filteredProducts.map((product, index) => (
                <option
                  value={product.id}
                  key={index}
                  selected={data.find((i: any) => i.id === selectedData?.id)}
                >
                  {`${product.name} ${product.strength} ${product.units}`}
                </option>
              ))
            : ""}
        </select>
      </div>
      <div className="col-md-8">
        {selectedData ? (
          <>
            <div className="d-block d-md-none py-3">
              <h5>Product details</h5>
              <div className="row">
                <div className="details ps-3">
                  <div className="row mb-2">
                    <div className="col-6 card-item-value text-gray-950">
                      Product Name
                    </div>
                    <div className="col-6 card-item-value text-gray-950">
                      {selectedData.name}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6 card-item-value text-gray-950">
                      Qty
                    </div>
                    <div className="col-6 card-item-value text-gray-950">
                      {selectedData.quantity}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6 card-item-value text-gray-950">
                      Rpts
                    </div>
                    <div className="col-6 card-item-value text-gray-950">
                      {selectedData.repeats}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6 card-item-value text-gray-950">
                      Restriction
                    </div>
                    <div className="col-6 card-item-value text-gray-950">
                      {selectedData.restriction}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6 card-item-value text-gray-950">
                      BPP
                    </div>
                    <div className="col-6 card-item-value text-gray-950"></div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6 card-item-value text-gray-950">
                      TGP/SPC
                    </div>
                    <div className="col-6 card-item-value text-gray-950"></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        <table className="d-none d-md-table table table-striped table-bordered border-slate-400 rounded-2 overflow-hidden">
          <thead>
            <tr>
              <th className="bg-primary-900 text-white th-font">
                Product Name
              </th>
              <th className="bg-primary-900 text-white th-font">Qty</th>
              <th className="bg-primary-900 text-white th-font">Rpts</th>
              <th className="bg-primary-900 text-white th-font">Restriction</th>
              <th className="bg-primary-900 text-white th-font">BPP</th>
              <th className="bg-primary-900 text-white th-font">TGP/SPC</th>
              {/* <th className="bg-primary-900 text-white th-font">
                Generic Name
              </th> */}
            </tr>
          </thead>
          <tbody>
            {selectedData ? (
              <tr>
                <td>{selectedData.name}</td>
                <td>{selectedData.quantity}</td>
                <td>{selectedData.repeats}</td>
                <td>{selectedData.restriction}</td>
                <td>{/* {selectedData.bpp} */}</td>
                <td>{/* {selectedData.tgp_spc} */}</td>
                {/* <td>{selectedData.generic_name}</td> */}
              </tr>
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-5"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SelectProduct;
