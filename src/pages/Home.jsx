import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading.jsx";

import BooksCard from "../components/Home/BooksCard.jsx";
import BooksTable from "../components/Home/BooksTable.jsx";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5001/api/v1/books/get-books")
      .then((response) => {
        console.log(response.data.books);
        setBooks(response.data.books);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-6000 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-6000 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {isLoading ? <Loading /> : showType ==='table' ? <BooksTable books={books} /> : <BooksCard books={books}/>}
    </div>
  );
};

export default Home;