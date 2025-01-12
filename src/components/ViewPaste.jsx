import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const ViewPaste = () => {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id === id)[0];
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-2xl bg-black shadow-lg rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            value={paste.title}
            disabled
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-800 text-white border-2 border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200 placeholder-white"
            placeholder="Enter title here"
          />
          {/* <button
            onClick={createPaste}
            className="px-4 py-2 bg-pink-300 text-black font-semibold rounded-md hover:bg-pink-400 transition duration-100"
          >
            {pasteId ? "Update My Paste" : "Create My Paste"}
          </button> */}
        </div>
        <textarea
          value={paste.content}
          disabled
          placeholder="Enter content here."
          // onInput={handleInput} // Adjust height dynamically on input
          className="w-full p-4 bg-gray-800 text-white border-2 border-gray-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-pink-200 placeholder-white"
          style={{ overflow: "hidden" }} // Hide the scrollbar for better UX
        />
      </div>
    </div>
  );
};

export default ViewPaste;
