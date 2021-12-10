// const csvData = "searchLog.csv";

// d3.csv(csvData).then(function (data) {
//   // console.log(data);
//   let newArr = [];
//   for (let i = 0; i < data.length; i++) {
//     newArr.push(data[i].query);
//   }
//   // console.log(newArr);
//   let countObj = {};
//   let countArr = [];
//   function countFunc(keys) {
//     countObj[keys] = ++countObj[keys] || 1;
//     // console.log(countObj);
//   }
//   newArr.forEach(countFunc);
//   // console.log(countObj);

//   const searched = [];
//   const popular = [];
//   const count = Object.entries(countObj).map((e) => ({ [e[0]]: e[1] }));
//   for (let i = 0; i < count.length; i++) {
//     searched.push(Object.keys(count[i]));
//     popular.push(Object.values(count[i]));

//     // setup
//     const barChart = {
//       labels: searched,
//       datasets: [
//         {
//           label: "Weekly Sales",
//           data: popular,
//           backgroundColor: [
//             "rgba(255, 26, 104, 0.2)",
//             "rgba(54, 162, 235, 0.2)",
//             "rgba(255, 206, 86, 0.2)",
//             "rgba(75, 192, 192, 0.2)",
//             "rgba(153, 102, 255, 0.2)",
//             "rgba(255, 159, 64, 0.2)",
//             "rgba(0, 0, 0, 0.2)",
//           ],
//           borderColor: [
//             "rgba(255, 26, 104, 1)",
//             "rgba(54, 162, 235, 1)",
//             "rgba(255, 206, 86, 1)",
//             "rgba(75, 192, 192, 1)",
//             "rgba(153, 102, 255, 1)",
//             "rgba(255, 159, 64, 1)",
//             "rgba(0, 0, 0, 1)",
//           ],
//           borderWidth: 1,
//         },
//       ],
//     };

//     // config
//     const config = {
//       type: "bar",
//       data,
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//     };

//     // render init block
//     let myChart = new Chart(
//       document.getElementById("myChart").getContext("2d"),
//       config
//     );
//     myChart.update();
//     myChart = new Chart(
//       document.getElementById("myChart").getContext("2d"),
//       config
//     );
//   }
// });
