import React, { useState } from "react";
import BackButton from "../components/BackButton.jsx";
import Loading from "../components/Loading.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
const DeleteBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteBook = () => {
    setIsLoading(true);
    axios
      .delete(`http://localhost:5001/api/v1/books/delete-book/${id}`)
      .then(() => {
        setIsLoading(false);
        enqueueSnackbar("Book deleted sucessfully" , {variant : 'success'} )
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        // alert("An error has occurred. Please check the console for details.");
        enqueueSnackbar("Error" , {variant : "error"})
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {isLoading ? <Loading /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">
          Are You shure You want to delete this book ?
        </h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
