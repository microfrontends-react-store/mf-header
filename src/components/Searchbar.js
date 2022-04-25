import React, { useState } from "react";

export const Searchbar = ({ query, searchHandler }) => {
  const [keyword, setKeyword] = useState(query);

  const keywordHandler = (e) => {
    setKeyword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim().length > 2) {
      searchHandler(keyword);
      setKeyword("");
    }
  };

  return (
    <form className="d-flex" onSubmit={submitHandler}>
      <input
        value={keyword}
        onChange={keywordHandler}
        className="form-control me-2"
        type="text"
        placeholder="Buscar"
        aria-label="Search"
      />
      <button onClick={submitHandler} className="btn btn-light" type="submit">
        Buscar
      </button>
    </form>
  );
};
