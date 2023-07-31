import React from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

Chart.register(ArcElement, Tooltip, Legend);

const BudgetBreakdownGraph = () => {
  const flightCost = useSelector((state) => state.trips.singleTrip.flight.cost);
  const hotelCost = useSelector((state) => state.trips.singleTrip.hotel.cost);
  const activityInfo = useSelector(
    (state) => state.trips.singleTrip.activities
  );

  let activityTotal = 0;

  function activityCostSum() {
    activityInfo.map((activity, index) => {
      return (activityTotal += activity.cost);
    });
  }
  activityCostSum();

  const data = {
    labels: ["Activities", "Hotel", "Flight"],
    datasets: [
      {
        label: "Assigned Budget",
        data: [activityTotal, hotelCost, flightCost],
        backgroundColor: ["#FF6384", "#5ed8eb", "#bb9eff"],
        hoverBackgroundColor: ["#ff0037", "#00a1eb", "#b752ff"],
        hoverOffset: 30,
        borderWidth: 3,
        hoverBorderColor: "#DCEDC8",
      },
    ],
  };

  const options = {
    layout: {
      padding: 30,
    },
    plugins: {
      Tooltip: {
        enabled: true,
      },
      legend: {
        display: true,
        fontColor: "white",
        position: "top",
        labels: {
          color: "white",
        },
      },
    },
  };

  return <Pie data={data} options={options} height={400} width={400} />;
};

export default BudgetBreakdownGraph;

//Chart.register(ArcElement);
