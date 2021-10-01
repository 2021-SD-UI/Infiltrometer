
import { useDispatch, useSelector } from "react-redux";
import { selectPage, setPage } from "../page-redirection/redirector-slice";
import { Collapse } from "react-collapse";
import { useState } from "react";
export const NavBar = () => {

    const dispatch = useDispatch();
    const initialState = {
        collapsed: false
    }

    const [state, setState] = useState(initialState);
    return(
        <div>
          
        <Collapse isOpened = {!state.collapsed}>
            <h1 class = "dark">
                NavBar Demo
            </h1>
           <button class="btn btn-dark" onClick ={
                ()=>dispatch(setPage("/Infiltrometer/baer-initialize"))
              }>  
              New Baer Test</button>
        </Collapse>

          <div>
                <button class="btn btn-dark" onClick = {()=>setState({...state, collapsed: !state.collapsed})}>
                    {state.collapsed ? "Open" : "Close"}
                </button>
            </div>
        </div>
        

    );


}