import { useState, useEffect } from "react";
import axios from "axios";

function Homepage() {
  const [travels, setDataTravel] = useState([]);
  const [findTravel, setFindTravel] = useState("");

  const dataTravel = async () => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${findTravel}`
    );
    setDataTravel(result.data.data);
    console.log(result.data.data);
  };

  const handleClick = (findTravel) => {
    setFindTravel(findTravel)
  };

  useEffect(() => {
    dataTravel();
  }, [findTravel]);

  const handleTodoTravel = (event) => {
    setFindTravel(event.target.value);
  };

  function truncateDescription(description) {
    if (description.length <= 100) {
      return description;
    }
    return description.slice(0, 100) + "...";
  }

  return (
    <section>
      <h1 className="texthead">เที่ยวไหนดี</h1>
      <h4>ค้นหาที่เที่ยว</h4>
    <div className="text">
      <input
        id="find-travel"
        type="text"
        value={findTravel}
        onChange={handleTodoTravel}
        placeholder="หาที่เที่ยวแล้วไปกัน ..."
      />
    </div>
      

      <main>
        {travels.map((travel, index) => {
          return (
            <div className="travel-list" key={index}>
              <aside>
                <img
                  className="picture0"
                  width={400}
                  height={320}
                  src={travel.photos[0]}
                  alt="main-picture"
                />
              </aside>
              <body className="contanier">
                <h3>{travel.title}</h3>
                <p>{truncateDescription(travel.description)}</p>

                <a href={travel.url} target="_blank">
                  อ่านต่อ
                </a>
                <p>
                  หมวด :
                  {travel.tags.map((tag, index) => {
                    return (
                      <span
                        className="tag"
                        key={index}
                        onClick={() => handleClick(tag)}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </p>

                <div>
                  {travel.photos.slice(1).map((photo, index) => {
                    return (
                      <img
                        className="allpicture"
                        width={130}
                        height={130}
                        key={index + 1}
                        src={photo}
                      />
                    );
                  })}
                </div>
              </body>
            </div>
          );
        })}
      </main>
    </section>
  );
}

export default Homepage;
