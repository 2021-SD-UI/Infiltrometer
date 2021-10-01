import { useDispatch, useSelector } from "react-redux";
import { selectPage, setPage } from "./redirector-slice";
import { useLocation, Redirect } from "react-router";
import { Route } from "react-router";
import { useEffect } from "react";
//Used to redirect to new pages from global state
 export const Redirector = () =>{

    const curPage = useLocation().pathname;
    const page = useSelector(selectPage);

    const dispatch = useDispatch();

    useEffect(()=>{console.log("hi")});
    /*
    //reset the page
    if (curPage == page) {
        dispatch(setPage(null));
        return null;
    }
    */
    

    return page!=null ? <Redirect to ={page}/> : null;
  }
