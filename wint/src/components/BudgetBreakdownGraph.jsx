import React from "react";
import { Chart, ArcElement } from "chart.js";
import { Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

const BudgetBreakdownGraph = () => {
  const data = {
    labels: ["Label 1", "Label 2", "Label 3"],
    datasets: [
      {
        label: "My First Dataset",
        data: [30, 50, 20],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverOffset: 20,
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
    <div>
      <h2>Budget Breakdown Graph</h2>
      <Doughnut data={data} options={options} height={500} width={500} />
    </div>
  );
};

export default BudgetBreakdownGraph;

//Chart.register(ArcElement);
