import SearchForm from "./SearchForm";
import RecipeCard from "./RecipeCard";
import NoDataDisplay from "./NoDataDisplay";
import { fetchData, getRecipes } from "../api"; // pastikan sesuai path
import { useEffect, useState } from "react";

const DaftarProduct = () => {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [listRecipes, setListRecipes] = useState([]);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchData(getRecipes);
      setListRecipes(data || []);
      setView("list");
      setCurrentPage(1);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleSearch = (filteredResults) => {
    setResults(filteredResults);
    setView("result");
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedRecipes =
    view === "list"
      ? listRecipes.slice(indexOfFirstItem, indexOfLastItem)
      : results.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    (view === "list" ? listRecipes.length : results.length) / itemsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      <div className="px-20">
        <h2 className="text-center text-3xl p-4 font-poppins font-extrabold text-blue-400">
          DAFTAR RESEP
        </h2>

        <div className="flex flex-wrap justify-center">
          {paginatedRecipes.length > 0 ? (
            paginatedRecipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                name={recipe.recipeName}
                image={recipe.image}
                id={recipe._id}
              />
            ))
          ) : (
            <NoDataDisplay />
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <ul className="flex list-none">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`mx-1 ${
                  currentPage === index + 1 ? "font-bold" : ""
                }`}
              >
                <button
                  onClick={() => paginate(index + 1)}
                  className="px-4 py-2 border rounded"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DaftarProduct;
