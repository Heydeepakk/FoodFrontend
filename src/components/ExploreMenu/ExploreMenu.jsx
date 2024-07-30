import React, { useEffect, useState } from "react";
import "./ExploreMenu.css";
import axios from "axios";
import { toast } from "react-toastify";

const ExploreMenu = ({ category, setCategory }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/catagory/listCatagory`
      );

      if (response.data.success) {
        setList(response.data.data);
        console.log(response.data);
      } else {
        toast.error("Error fetching category list");
      }
    } catch (error) {
      toast.error("Error fetching category list");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      {/* <p className="explore-menu-text">
        Out Catagories
      </p> */}
      <div className="explore-menu-list-wrapper">
        <div className="explore-menu-list">
          {list.map((item, index) => {
            return (
              <div
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.catagoryName ? "All" : item.catagoryName
                  )
                }
                key={index}
                className="explore-menu-list-item"
              >
                <img
                  className={category === item.catagoryName ? "active" : ""}
                  src={item.image}
                  alt={item.catagoryName}
                />
                <p>{item.catagoryName}</p>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
