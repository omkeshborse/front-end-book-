import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar  } from "notistack";
const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const {enqueueSnackbar} = useSnackbar()
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5001/api/v1/books/get-book/${id}`)
      .then((response) => {
        console.log(response.data.book);
        setAuthor(response.data.book.author);
        setPublishYear(response.data.book.publishYear);
        setTitle(response.data.book.title);
        setIsLoading(false) ;
      })
      .catch((error)=>{
        setIsLoading(false) ;
        alert("An error has occurred. Please check the console for details.")
        console.log(error.message);
      })
  }, []);


  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setIsLoading(true);
    axios
      .put(`http://localhost:5001/api/v1/books/update-book/${id}`, data)
      .then(() => {
        setIsLoading(false);
        enqueueSnackbar('Book Edited Successfully' ,{variant : 'success'})
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        // alert("An error has occurred. Please check the console for details.");
        enqueueSnackbar("error" , {variant : "error"}) ;
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {isLoading ? <Loading /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500" htmlFor="">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500" htmlFor="">
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500" htmlFor="">
            Publish Year{" "}
          </label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
