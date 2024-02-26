import { useState, useEffect } from "react";
import React from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Cards from "./components/card";
import axios from "axios";
import { Skeleton, Space } from "antd";
import LoadingCards from "./components/LoadingCards";

const baseurl = import.meta.env.VITE_BASEURL;
const Header = import.meta.env.VITE_HEADER;

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    await axios
      .get(baseurl, {
        headers: {
          Authorization: Header,
        },
      })
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        message.error("Error fetching tasks:", error);
      });
  };

  const onSuccess = () => {
    fetchTasks(setTasks);
  };

  useEffect(() => {
    fetchTasks(setTasks);
  }, []);

  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      <div className="cards1">
        {loading ? (
          <Skeleton
            active
            style={{
              height: 20,
              width: 298,
              marginLeft: 50,
            }}
          ></Skeleton>
        ) : (
          <Space direction="horizontal" wrap>
            {tasks.map((data, index) => (
              <Cards
                key={index}
                id={data.id}
                title={data.title}
                para={data.para}
                onSuccess={onSuccess}
              ></Cards>
            ))}
          </Space>
        )}

        <LoadingCards onSuccess={onSuccess} />
      </div>
    </>
  );
}

export default App;
