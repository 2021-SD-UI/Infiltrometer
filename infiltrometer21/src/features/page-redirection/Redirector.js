import { useDispatch, useSelector } from "react-redux";
import { selectPage, setPage } from "./redirector-slice";
import { useLocation, Redirect } from "react-router";
import { Route } from "react-router";
import { useEffect } from "react";
import reportsSlice, { selectCurId, selectGatheringData } from "../reports/reportsSlice";


export const Pages =
{
  Homepage: "/",
  BaerInitializeView: "/baer-initialize",
  BaerReplicationView: "/baer-replication",
  BaerResultsView: "/baer-results",
  StandardInitializeView: "/standard-initialize",
  StandardReplicationView: "/standard-replication",
  StandardResultsView: "/standard-results",
  BaerManual: "/manuals-baer",
  InfiltrometerManual: "/manuals-infiltrometer",
  ReportsView: "/reports"
}






//Used to redirect to new pages from global state
export const Redirector = ({ protectedElements }) => {
  const curPage = useLocation().pathname;   //this is the actual url in the browser
  const page = useSelector(selectPage);     //this is the url in the Redux store
  //if the urls match, we render the protected elements (JSX passed as a prop to this component)
  //if the urls do not match, we render a redirect message to the valid url
  return page !== curPage ? <Redirect to={page} /> : protectedElements;
}
