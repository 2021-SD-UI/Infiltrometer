import React from 'react';
import regressionJs from './regression-js';
export function RegressionTesting(){

    function handleChange(event) {
    state.value = event.target.value;
  }
  let state = {
      value: "",
      results: {}
  };
  function handleSubmit(event) {
    //create the data values
    let points= state.value.split(" ");
    for (let i = 0; i < points.length; i ++){
        points[i] = points[i].split(',');
    }
    state.results = regressionJs.polynomial(points, { order: 2, precision: 15 });

    alert('Points were submitted: ' + points + "\nRegression output: " + state.results.string);
    console.log(state.results);
  }
    return(
        <div>

        
        <form>
        <label>
          Data Points: {state.value}
          <input type="text" onChange={handleChange}></input>
        </label>
        
        </form>
            <div>
                <button onClick = {handleSubmit}>
                    Submit For Regression
                </button>
            </div>
        </div>

    );
}