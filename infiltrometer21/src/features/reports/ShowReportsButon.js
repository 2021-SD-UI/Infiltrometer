import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {selectReports
} from './reportsSlice';

let reports;
function PrintReports(){
  reports = useSelector(selectReports)
  console.log(reports);
}

export function ShowReportsButton() {
    const reports = useSelector(selectReports);

    return(
    <div>
        <button onClick={()=>console.log(reports)}>
            Show Reports in Store
        </button>
    </div>

  );

}