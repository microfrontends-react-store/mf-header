import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { getProductsByKeyword, setProdutcs } from "@meli-store/api";
import { routes } from "../helpers/header-helper";
import { Searchbar } from "./Searchbar";

export const Navbar = () => {

  const [data, setData] = useState({
    keyword: "Tenis",
    products: {},
    loggedIn: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    sesionHandler();
    const storageEvent = ({target}) => {
      console.log(target.value)
      // if (event.key == 'token') {
      //   sesionHandler();
      // }
    }
    window.addEventListener('storage', storageEvent);
    return () => {
      window.removeEventListener('storage', storageEvent);
    }
  }, []);

  useEffect(() => {
    getProductsByKeyword(data.keyword).then(({ results }) => {
      setData({ ...data, products: results });
      setProdutcs(results);
      navigate("/");
    });
  }, [data.keyword]);

  useEffect(() => {
    authOption = renderAuthOptions();
  }, [data.loggedIn]);

  const searchHandler = (keyword) => {
    setData({ ...data, keyword });
  };

  const sesionHandler = () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setData({ ...data, loggedIn: true });
    }
  }

  const closeSesionHandler = () => {
    window.localStorage.removeItem("token");
    setData({ ...data, loggedIn: false });
  }

  const renderAuthOptions = () => {
    const token = window.localStorage.getItem("token")
    if (token) {
      return (
        <li className="nav-item" onClick={closeSesionHandler}>
          <Link
            className="nav-link"
            to={"/"}
          >
            {"Cerrar sesión"}
          </Link>
        </li>
      )
    } else {
      return (
        <li className="nav-item" key={"/login"}>
          <NavLink
            className={({ isActive }) =>
              "nav-link " + (isActive ? "active" : "")
            }
            to={"/login"}
          >
            {"Login"}
          </NavLink>
        </li>
      )
    }
  }

  let authOption = renderAuthOptions();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Store
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {routes.map((route) => (
              <li className="nav-item" key={route.path}>
                <NavLink
                  className={({ isActive }) =>
                    "nav-link " + (isActive ? "active" : "")
                  }
                  to={route.path}
                >
                  {route.name}
                </NavLink>
              </li>
            ))}
            {authOption}
          </ul>
          <Searchbar query={data.keyword} searchHandler={searchHandler} />
        </div>
      </div>
    </nav>
  );
};
