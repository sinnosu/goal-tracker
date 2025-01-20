import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.jsのコンポーネントを登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const initialGoals = [
  {
    id: 1,
    name: "目標1",
    description: "Toeic800点",
    period: { start: "2023-01-01", end: "2023-12-31" },
    goalScore: "100",
    startPoint: "0",
    waypoints: [
      { score: "20", date: "2023-03-01" },
      { score: "50", date: "2023-06-01" },
      { score: "80", date: "2023-09-01" },
    ],
  },
  {
    id: 2,
    name: "目標2",
    description: "プロジェクト完了",
    period: { start: "2023-02-01", end: "2023-11-30" },
    goalScore: "200",
    startPoint: "10",
    waypoints: [
      { score: "40", date: "2023-04-01" },
      { score: "100", date: "2023-07-01" },
      { score: "150", date: "2023-10-01" },
    ],
  },
];

function GoalList({ goals, onSelectGoal, onAddGoal }) {
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalDescription, setNewGoalDescription] = useState("");

  const handleAddGoal = () => {
    if (newGoalName.trim() !== "" && newGoalDescription.trim() !== "") {
      onAddGoal(newGoalName, newGoalDescription);
      setNewGoalName("");
      setNewGoalDescription("");
    }
  };

  return (
    <div>
      <h2>目標リスト</h2>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id} onClick={() => onSelectGoal(goal)}>
            {goal.name} - {goal.description}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newGoalName}
          onChange={(e) => setNewGoalName(e.target.value)}
          placeholder="新しい目標名"
        />
        <input
          type="text"
          value={newGoalDescription}
          onChange={(e) => setNewGoalDescription(e.target.value)}
          placeholder="目標の説明"
        />
        <button onClick={handleAddGoal}>追加</button>
      </div>
    </div>
  );
}

function GoalMap({ goal, onBack }) {
  const [goalData, setGoalData] = useState(goal);
  const [actualData, setActualData] = useState(
    goal.waypoints.map((wp) => ({ ...wp, actualScore: "" }))
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalData((prevGoal) => ({
      ...prevGoal,
      [name]: value,
    }));
  };

  const handleWaypointChange = (index, e) => {
    const { name, value } = e.target;
    const newWaypoints = [...goalData.waypoints];
    newWaypoints[index][name] = value;
    setGoalData((prevGoal) => ({
      ...prevGoal,
      waypoints: newWaypoints,
    }));
  };

  const handleActualChange = (index, e) => {
    const { name, value } = e.target;
    const newActualData = [...actualData];
    newActualData[index][name] = value;
    setActualData(newActualData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(goalData);
    console.log(actualData);
    localStorage.setItem("selectedGoal", JSON.stringify(goalData));
    localStorage.setItem("actualData", JSON.stringify(actualData));
  };

  const data = {
    labels: [
      goalData.period.start,
      ...goalData.waypoints.map((wp) => wp.date),
      goalData.period.end,
    ],
    datasets: [
      {
        label: "計画",
        data: [
          goalData.startPoint,
          ...goalData.waypoints.map((wp) => wp.score),
          goalData.goalScore,
        ],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "実績",
        data: [
          goalData.startPoint,
          ...actualData.map((ad) => ad.actualScore),
          goalData.goalScore,
        ],
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <button onClick={onBack}>Back to Goal List</button>
      <h1>Goal Tracker</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Period: </label>
          <input
            type="date"
            name="start"
            value={goalData.period.start}
            onChange={handleChange}
          />
          <input
            type="date"
            name="end"
            value={goalData.period.end}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Goal: </label>
          <input
            type="number"
            name="goalScore"
            value={goalData.goalScore}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Start Point: </label>
          <input
            type="number"
            name="startPoint"
            value={goalData.startPoint}
            onChange={handleChange}
          />
        </div>
        {goalData.waypoints.map((waypoint, index) => (
          <div key={index}>
            <label>Waypoint {index + 1}: </label>
            <input
              type="number"
              name="score"
              value={waypoint.score}
              onChange={(e) => handleWaypointChange(index, e)}
            />
            <input
              type="date"
              name="date"
              value={waypoint.date}
              onChange={(e) => handleWaypointChange(index, e)}
            />
            <label>Actual Score: </label>
            <input
              type="number"
              name="actualScore"
              value={actualData[index].actualScore}
              onChange={(e) => handleActualChange(index, e)}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      <Line data={data} />
    </div>
  );
}

function App() {
  const [goals, setGoals] = useState(initialGoals);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [actualData, setActualData] = useState([]);

  const handleAddGoal = (name, description) => {
    const newGoal = {
      id: goals.length + 1,
      name,
      description,
      period: { start: "", end: "" },
      goalScore: "",
      startPoint: "",
      waypoints: [],
    };
    setGoals([...goals, newGoal]);
  };

  // コンポーネントのマウント時にlocalStorageからデータを読み込む
  useEffect(() => {
    const storedGoal = localStorage.getItem("selectedGoal");
    const storedActualData = localStorage.getItem("actualData");
    if (storedGoal) {
      setSelectedGoal(JSON.parse(storedGoal));
    }
    if (storedActualData) {
      setActualData(JSON.parse(storedActualData));
    }
  }, []);

  return (
    <div>
      {selectedGoal ? (
        <GoalMap goal={selectedGoal} onBack={() => setSelectedGoal(null)} />
      ) : (
        <GoalList
          goals={goals}
          onSelectGoal={setSelectedGoal}
          onAddGoal={handleAddGoal}
        />
      )}
    </div>
  );
}

export default App;
