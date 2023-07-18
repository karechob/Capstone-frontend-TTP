import React from "react";
import { Chart, ArcElement } from "chart.js";
import { Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
// import { Doughnut, Pie } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

const BudgetBreakdownGraph = () => {
  const data = {
    labels: ["Activities", "Travel & Stay"],
    datasets: [
      {
        label: "Assigned Budget",
        data: [70, 50],
        backgroundColor: ["#FF6384", "#5ed8eb"],
        hoverBackgroundColor: ["#ff0037", "#00a1eb"],
        hoverOffset: 4,
        borderWidth: 3,
        hoverBorderColor: "#DCEDC8",
      },
    ],
  };

  const options = {    
    plugins: {
      Tooltip: {
        enabled: true,
      },
      Legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  return (
      <Doughnut data={data} options={options} height={400} width={400} />
  );
};

export default BudgetBreakdownGraph;

//Chart.register(ArcElement);
