let popular = [];
let notSo = [];
let popularLabel = [];
let notSoLabel = [];

// Input function to upload CSV file
const uploadSubmit = document
  .getElementById("upload-submit")
  .addEventListener("click", () => {
    Papa.parse(document.getElementById("upload-file").files[0], {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data.map((hit) => hit.hits));
        let output = Object.values(
          results.data.reduce((obj, { query }) => {
            if (obj[query] === undefined) {
              obj[query] = {
                query: query,
                occurrences: 1,
              };
            } else {
              obj[query].occurrences++;
            }
            return obj;
          }, {})
        );

        output.map((item) => {
          //   console.log(item);
          if (item.occurrences === 1) {
            notSo.push(item);
            notSoLabel.push(item.query);
          } else {
            popular.push(item);
            popularLabel.push(item.query);
          }
        });
      },
    });
  });

const data = {
  labels: [],
  datasets: [
    {
      label: "# of Votes",
      borderWidth: 5,
      backgroundColor: "rgb(128, 255, 0)",
      borderColor: "black",
      spacing: 15,
      hoverBackgroundColor: "white",
    },
  ],
};

const config = {
  type: "pie",
  data,
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
  },
};

// Setup for Chart.
const myChart = new Chart(document.getElementById("myChart"), config);

function updateChart(label) {
  if (label === "popular") {
    myChart.data.labels = popularLabel.map((name) => {
      return name;
    });
    myChart.data.datasets[0].data = popular.map((searches) => {
      return searches.occurrences;
    });
  }
  if (label === "notSo") {
    myChart.data.labels = notSoLabel.map((name) => {
      return name;
    });
    myChart.data.datasets[0].data = notSo.map((searches) => {
      return searches.occurrences;
    });
  }
  myChart.update();
}
