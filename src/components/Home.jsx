import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  // Function to handle dynamic resizing of the textarea
  const handleInput = (e) => {
    e.target.style.height = "auto"; // Reset height
    e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scrollHeight
    setValue(e.target.value); // Update the value
  };

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste)); // Update existing paste
    } else {
      dispatch(addToPastes(paste)); // Create new paste
    }

    // After dispatch, clear the title and value
    setTimeout(() => {
      setTitle("");
      setValue("");
      setSearchParams({}); // Clear the searchParams (URL query string)
    }, 500 ); // Delay clearing to allow time for dispatch
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-2xl bg-black shadow-lg rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-800 text-white border-2 border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200 placeholder-white"
            placeholder="Enter title here"
          />
          <button
            onClick={createPaste}
            className="px-4 py-2 bg-pink-300 text-black font-semibold rounded-md hover:bg-pink-400 transition duration-100"
          >
            {pasteId ? "Update My Paste" : "Create My Paste"}
          </button>
        </div>
        <textarea
          value={value}
          placeholder="Enter content here."
          onInput={handleInput} // Adjust height dynamically on input
          className="w-full p-4 bg-gray-800 text-white border-2 border-gray-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-pink-200 placeholder-white"
          style={{ overflow: "hidden" }} // Hide the scrollbar for better UX
        />
      </div>
    </div>
  );
};

export default Home;
