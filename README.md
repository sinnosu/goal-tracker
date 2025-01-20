# Goal Tracker Application

This application is designed to track goals with waypoints and visualize progress using React.

## Installation

### Prerequisites

- Node.js and npm

### Setting Up the React Application

1. **Clone the repository**:

   ```sh
   git clone <repository-url>
   cd goal-tracker
   ```

2. **Set up the React environment**:

   ```sh
    # use vite
    npm create vite@latest
   cd goal-tracker
   npm install
   # change the file package.json: reaplace scripts->dev with scripts->start
   npm start
   # install chartjs
   npm install react-chartjs-2 chart.js
   ```

### Creating the Goal Tracker Form

1. **Edit the `App.js` file** to include a form for inputting the goal and waypoints:

   ```javascript
   import React, { useState } from "react";
   import { Line } from "react-chartjs-2";

   function App() {
     const [goal, setGoal] = useState({
       period: { start: "", end: "" },
       goalScore: "",
       startPoint: "",
       waypoints: [
         { score: "", date: "" },
         { score: "", date: "" },
         { score: "", date: "" },
       ],
     });

     const handleChange = (e) => {
       const { name, value } = e.target;
       setGoal((prevGoal) => ({
         ...prevGoal,
         [name]: value,
       }));
     };

     const handleWaypointChange = (index, e) => {
       const { name, value } = e.target;
       const newWaypoints = [...goal.waypoints];
       newWaypoints[index][name] = value;
       setGoal((prevGoal) => ({
         ...prevGoal,
         waypoints: newWaypoints,
       }));
     };

     const handleSubmit = (e) => {
       e.preventDefault();
       console.log(goal);
     };

     const data = {
       labels: [
         goal.period.start,
         ...goal.waypoints.map((wp) => wp.date),
         goal.period.end,
       ],
       datasets: [
         {
           label: "TOEIC Score",
           data: [
             goal.startPoint,
             ...goal.waypoints.map((wp) => wp.score),
             goal.goalScore,
           ],
           fill: false,
           borderColor: "rgb(75, 192, 192)",
           tension: 0.1,
         },
       ],
     };

     return (
       <div>
         <h1>Goal Tracker</h1>
         <form onSubmit={handleSubmit}>
           <div>
             <label>Period: </label>
             <input
               type="date"
               name="start"
               value={goal.period.start}
               onChange={handleChange}
             />
             <input
               type="date"
               name="end"
               value={goal.period.end}
               onChange={handleChange}
             />
           </div>
           <div>
             <label>Goal: </label>
             <input
               type="number"
               name="goalScore"
               value={goal.goalScore}
               onChange={handleChange}
             />
           </div>
           <div>
             <label>Start Point: </label>
             <input
               type="number"
               name="startPoint"
               value={goal.startPoint}
               onChange={handleChange}
             />
           </div>
           {goal.waypoints.map((waypoint, index) => (
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
             </div>
           ))}
           <button type="submit">Submit</button>
         </form>
         <Line data={data} />
       </div>
     );
   }

   export default App;
   ```

2. **Install the chart library**:
   ```sh
   npm install react-chartjs-2 chart.js
   ```

### Running the Application

1. **Start the React application**:

   ```sh
   npm start
   ```

2. **Open your browser** and navigate to `http://localhost:3000` to see the application in action.

## Additional Resources

- React documentation: [React](https://reactjs.org/docs/getting-started.html)
- Chart.js documentation: [Chart.js](https://www.chartjs.org/docs/latest/)

## License

This project is licensed under the MIT License.
o

```

## まとめ

この記事では、React.jsとChart.jsを使用して目標の進捗を追跡するアプリを構築しました。アプリには、目標のリストを表示し、選択した目標の進捗をグラフで表示する機能があります。また、目標の詳細を編集し、実績を入力できるフォームを追加しました。これにより、目標を設定し、進捗を追跡するのに役立つツールを作成しました。

このアプリの機能をさらに拡張することも可能です。たとえば、目標の削除や編集機能を追加したり、目標の進捗を自動的に計算する機能を追加したりすることができます。また、目標を共有したり、他のユーザーと共有したりする機能を追加することもできます。React.jsとChart.jsを使用して、さまざまな目標を追跡するアプリを開発する際の参考にしてみてください。
```
