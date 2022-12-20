import '../css/Home.css';
import { djikstra } from '../controller/djikstra';
import { maps } from '../notes';
import { Loading } from '../components/loading';
import { useEffect, useState } from 'react';

export function Home() {
  var [listCity, setListCity] = useState([]);
  var [isLoading, setIsLoading] = useState(true);
  useEffect(function () {
    setTimeout(function () {
      var newListCity = [];
      for (let city of maps) {
        newListCity.push(city.city_name);
      }
      // console.log(listCity);
      newListCity.sort();
      setListCity((listCity = newListCity));
      setIsLoading((isLoading = false));
    }, 1000);
  }, []);

  function googleMaps(route) {
    var output = '';
    for (let char of route) {
      if (char === '-') {
        output += '/';
      } else {
        output += char;
      }
    }
    window.open(`https://www.google.co.id/maps/dir/${output}`);
  }
  var [result, setResult] = useState([]);

  return (
    <div className="home">
      <div>
        <svg
          class="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shape-rendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g class="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(255,255,255,0.7"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
      <nav>
        <h5>Djiskstra Algorithm</h5>
      </nav>
      {isLoading == true ? Loading() : null}
      <div
        className="box-form"
        style={isLoading == true ? { display: 'none' } : null}
      >
        <span>
          <p>Your Location</p>
          <select
            name="start-city-input"
            className="form-select"
            aria-label="Default select example"
          >
            {listCity.map(function (city) {
              return (
                <option value={city} key={`${city}-${city}`}>
                  {city}
                </option>
              );
            })}
          </select>
        </span>
        <span>
          <p>Destination</p>
          <select
            name="finish-city-input"
            className="form-select"
            aria-label="Default select example"
          >
            {listCity.map(function (city) {
              return (
                <option value={city} key={`${city}-${city}`}>
                  {city}
                </option>
              );
            })}
          </select>
        </span>

        <button
          className="btn"
          onClick={
            function () {
              setIsLoading((isLoading = true));
              var startCityInput =
                document.getElementsByName('start-city-input')[0].value;
              var finishCityInput =
                document.getElementsByName('finish-city-input')[0].value;

              setTimeout(function () {
                setResult(
                  (result = djikstra(maps, startCityInput, finishCityInput))
                );
                setIsLoading((isLoading = false));
                console.log('result');
                console.log(result);
              }, 1000);
            }
            // window.location.href = `https://www.google.co.id/maps/dir/${document.getElementsByName('start-city-input')[0].value}/${document.getElementsByName('finish-city-input')[0].value}`
          }
        >
          Get shortest route
        </button>

        {result.length > 0 ? (
          <table className="table">
            <thead
              className="table"
              style={{
                backgroundColor: 'rgb(255, 192, 203)',
                borderColor: 'rgb(255, 75, 105)',
              }}
            >
              <tr>
                <td>Route</td>
                <td>Distance</td>
                <td></td>
              </tr>
            </thead>
            {result.map(function (node) {
              return (
                <>
                  <tbody className="">
                    <tr className="" key={node.route}>
                      <td>{node.route}</td>
                      <td>{node.distance.toFixed(2)} Km</td>
                      <td>
                        <button
                          onClick={function () {
                            googleMaps(node.route);
                          }}
                          className="btn btn-outline-danger"
                        >
                          Detail Route
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </>
              );
            })}
          </table>
        ) : null}
      </div>
    </div>
  );
}
