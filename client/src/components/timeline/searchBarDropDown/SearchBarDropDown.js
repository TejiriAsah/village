import React, { useState, useRef, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./searchBarDropDown.scss";

const SearchBarDropDown = (props) => {
  const {
    options,
    onInputChange,
    searchValue,
    searchFunction,
    message,
    showModal,
    closeFunction,
    added,
    addBranch,
  } = props;

  const empty =
    Object.keys(options).length === 0 && options.constructor === Object;
  const optionsList = [];
  optionsList.push(options);
  console.log("options", options);

  return (
    <div className="search-bar-dropdown">
      <div className="search__box">
        <div>
          <input
            type="text"
            className="search__input"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => onInputChange(e, "search")}
            onKeyUp={(e) => (e.key === "Enter" ? searchFunction(e) : null)}
          />
        </div>
      </div>
      <ul className="result__container">
        {!empty &&
          showModal &&
          optionsList.map((option, index) => {
            return (
              <div key={index} className="result">
                <div className="result__flex">
                  <div>
                    <div className="result__div">
                      <p className="result__info">{option.name}</p>
                      <p className="result__info">@{option.username}</p>
                    </div>
                    <button
                      type="button"
                      key={index}
                      className="result__btn"
                      onClick={() => addBranch()}
                    >
                      {added ? "Added!" : "Add branch"}
                    </button>
                  </div>
                  <button
                    className="close-search"
                    onClick={() => closeFunction()}
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })}
        {empty && message.length > 0 && (
          <div className="result">
            <div className="result__div">
              <p className="result__info">{message}</p>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};

export default SearchBarDropDown;
