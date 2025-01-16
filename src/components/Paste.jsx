import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  const handleShare = (paste) => {
    const shareData = {
      title: paste.title,
      text: paste.content,
      url: `${window.location.origin}/pastes/${paste._id}`, // Shareable URL
    };

    if (navigator.share) {
      // If the Web Share API is available
      navigator
        .share(shareData)
        .then(() => toast.success("Paste shared successfully!"))
        .catch((error) => toast.error("Error sharing paste."));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard
        .writeText(shareData.url)
        .then(() => toast.success("Link copied to clipboard!"))
        .catch(() => toast.error("Failed to copy the link."));
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <input
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border-2 border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-300"
      />
      <div className="flex flex-col gap-6 mt-6">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="border-2 border-gray-700 bg-gray-800 rounded-lg p-4"
            >
              <div className="text-xl font-bold text-pink-100">
                {paste.title}
              </div>
              <div className="text-gray-400 mt-2">{paste.content}</div>
              {/* Responsive button container */}
              <div className="flex flex-wrap gap-4 mt-4">
                {/* Edit button */}
                <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150">
                  <Link to={`/?pasteId=${paste?._id}`}>Edit</Link>
                </button>
                {/* View button */}
                <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-150">
                  <Link to={`/pastes/${paste._id}`}>View</Link>
                </button>
                {/* Delete button */}
                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-150"
                >
                  Delete
                </button>
                {/* Copy button */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard");
                  }}
                  className="flex-1 px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-600 transition duration-150"
                >
                  Copy
                </button>
                {/* Share button */}
                <button
                  onClick={() => handleShare(paste)}
                  className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-150"
                >
                  Share
                </button>
              </div>
              <div className="mt-4 text-gray-500 text-sm">
                {paste.createdAt}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
