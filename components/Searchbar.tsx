"use client";
import { scrapeAndStoreProduct } from "@/lib/actions";
import axios from "axios";
import React, { FormEvent, useState } from "react";

const Searchbar = () => {
  const isValidAmazonProductURL = (url: any) => {
    try {
      const parsedUrl = new URL(url);
      const hostName = parsedUrl.hostname;

      if (
        hostName.includes("amazon.com") ||
        hostName.includes("amazon.") ||
        hostName.endsWith("amazon")
      ) {
        return true;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
    return false;
  };

  const [searchPrompt, setsearchPrompt] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // do not reload the page
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if (!isValidLink) {
      return alert("Please provide a valid Amazon link");
    }

    try {
      setisLoading(true);
      // Scrap Product Page
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setsearchPrompt(e.target.value)}
        placeholder="Enter Product Link"
        className="searchbar-input"
      />

      {/* <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ""}
      >
        {isLoading ? "Searching..." : "Search"}
      </button> */}

      <button
        className=" searchbar-btn before:ease relative h-12 w-28  overflow-hidden border border-black-500 bg-black-100 rounded-xl text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-black hover:before:-translate-x-40"
        type="submit"
        disabled={searchPrompt === ""}
      >
        <span className="relative z-10">
          {" "}
          {isLoading ? "Searching..." : "Search"}
        </span>
      </button>
    </form>
  );
};

export default Searchbar;
