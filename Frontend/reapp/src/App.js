import "./App.css";

export default function App() {
  return (
    <div className="Home">
      <div className="Numbers">
        <div className="Panel">
          <h2>
            {" "}
            Total no. of Users <br />
            25k{" "}
          </h2>{" "}
        </div>
        <div className="Panel">
          <h2>
            {" "}
            Total no. of Males <br />
            12k{" "}
          </h2>{" "}
        </div>
        <div className="Panel">
          <h2>
            {" "}
            Total no. of Females <br />
            13k{" "}
          </h2>{" "}
        </div>
        <div className="Panel">
          <h2>
            {" "}
            Average Time <br />
            130h{" "}
          </h2>{" "}
        </div>
      </div>

      <div className="Revenue">
        <div className="RevenueHist">
          <h1></h1>
          <img src="https://lh6.googleusercontent.com/wCGh48B5R1V-FnnUtEgnqiJD1qDFMGC2WSqQvOvVpUxLjto2BewZw3goXmTUjSidfQG95T3Wi2exwmvcxK2dOe0sl3lGqOvaPXf_Hopk8MKlSBhtyzhm9z5oD5LtnMbuytJ2u7dF" />
        </div>

        <div className="AreaPie">
          <h1> Revenue per Area</h1>
          <img src="https://chartio.com/assets/403918/tutorials/charts/pie-charts/23ee5d0ea754f76f7b73c04c3208e8614bb7d58dd270359593855019777d01b0/pie-chart-example-2.png" />
        </div>
      </div>

      <div className="Map">
        <div>
          <h1> Frequently booked locations</h1>
          <img src="https://1.bp.blogspot.com/-oorVqPXTMto/X9WDY6-aSGI/AAAAAAAAFMg/vbukJgnmG9kTh7u0xEAcNQ99f0Qu7AGpgCLcBGAsYHQ/s1125/Screenshot_2020-12-12%2BVisited%2BCountries%2BMap%2B-%2BCreate%2Ba%2BMap%2Bof%2Ball%2Bthe%2Bcountries%2Byou%2527ve%2Bvisited.png" />
        </div>
        <div className="Countries">
          <h1>
            {" "}
            Top countries viewed
            <br />
            in the last month
          </h1>
          <h2>
            <ul>
              United States
              <br />
              France
              <br />
              Italy
              <br />
              Germany
            </ul>
          </h2>
        </div>
      </div>

      <div className="Clicks">
        <h1> Percentage of clicks in the last hour</h1>
        <img src="https://www.conceptdraw.com/How-To-Guide/picture/Website-Page-Load-Time-Frequency-Histogram-.png" />
      </div>
    </div>
  );
}
