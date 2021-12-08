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
  BaerManual: "/manuals-baer",
  InfiltrometerManual: "/manuals-infiltrometer",
  ReportsView: "/reports"
}






//Used to redirect to new pages from global state
export const Redirector = ({ protectedElements }) => {

  const curPage = useLocation().pathname;
  const page = useSelector(selectPage);
  return page !== curPage ? <Redirect to={page} /> : protectedElements;
}
