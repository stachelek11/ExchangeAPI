import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SearchInput.scss";

const SearchInput = () => {
  const [stockData, setStockData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    searchValue !== ""
      ? fetch(`https://ticker-2e1ica8b9.now.sh/keyword/${searchValue}`)
          .then((response) => response.json())
          .then((Data) => {
            setStockData(Data);
          })
          .catch(() => {
            console.log("Error fetch symbol...");
          })
      : setStockData([]);
  }, [searchValue]);

  const handleBlur = (e) => {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setShowList(false);
      }
    }, 0);
  };

  const handleChange = (e) => {
    setTimeout(() => setSearchValue(e.target.value), 100);
  };

  const handleSelect = () => {
    setShowList(false);
    document.getElementById("myInput").value = "";
    setSearchValue("");
  };

  return (
    <div className="search" onBlur={handleBlur}>
      <input
        id="myInput"
        className="search__input"
        placeholder="Search..."
        type="text"
        onChange={handleChange}
        onFocus={() => setShowList(true)}
      />
      {showList && (
        <div className="search__return-list">
          {stockData.slice(0, 5).map((item, index) => {
            return (
              <Link
                className="search__return-link"
                to={`/details/${item.symbol}`}
                key={index}
              >
                <div className="search__return-item" onClick={handleSelect}>
                  {item.symbol} | {item.name}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
