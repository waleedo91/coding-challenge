let popular = [];
let notSo = [];
let popularLabel = [];
let notSoLabel = [];

// Upload CSV file and parses to JSON using papaParser
const uploadSubmit = document
  .getElementById("upload-submit")
  .addEventListener("click", () => {
    Papa.parse(document.getElementById("upload-file").files[0], {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        let shortRes = {};
        let newQuery = [];
        results.data.forEach((obj) => {
          shortRes = {
            query: obj.query,
            hits: obj.hits,
          };
          newQuery.push(shortRes);
        });

        // Counts the occurrences of each search query
        function occurrencesCount(arr, key, hits) {
          let arr2 = [];

          newQuery.forEach((x) => {
            if (
              arr2.some((val) => {
                return val[key] == x[key];
              })
            ) {
              arr2.forEach((k) => {
                if (k[key] === x[key]) {
                  k["occurrence"]++;
                }
              });
            } else {
              let a = {};
              a[key] = x[key];
              a[hits] = x[hits];
              a["occurrence"] = 1;
              arr2.push(a);
            }
          });
          return arr2;
        }

        let key = "query";
        let hits = "hits";
        const updatedRes = occurrencesCount(newQuery, key, hits);

        // Separates a query from ones with 0 hits and the ones with hits.
        updatedRes.forEach((item) => {
          if (item.hits === "0") {
            notSo.push(item);
            notSoLabel.push(item.query);
            return;
          } else {
            popular.push(item);
            popularLabel.push(item.query);
            return;
          }
        });
      },
    });
  });

// Chart setup beyond this point.
const data = {
  labels: [],
  datasets: [
    {
      label: "Searched",
      borderWidth: 1,
      borderColor: "green",
      hoverBackgroundColor: "red",
      backgroundColor: "black",
      radius: "60%",
    },
  ],
};

const config = {
  type: "doughnut",
  data,
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
  },
};

const myChart = new Chart(document.getElementById("myChart"), config);

// Adds event to Popular and Random button
function updateChart(label) {
  if (label === "popular") {
    myChart.data.labels = popularLabel.map((name) => {
      return name;
    });
    myChart.data.datasets[0].data = popular.map((searches) => {
      return searches.occurrence;
    });
  }
  if (label === "notSo") {
    myChart.data.labels = notSoLabel.map((name) => {
      return name;
    });
    myChart.data.datasets[0].data = notSo.map((searches) => {
      return searches.occurrence;
    });
  }
  myChart.update();
}
