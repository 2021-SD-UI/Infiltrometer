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
export const Redirector = () => {

  const curPage = useLocation().pathname;
  const page = useSelector(selectPage);

  const dispatch = useDispatch();
  const gatheringData = useSelector(selectGatheringData);
  //check if this is a valid switch
  if (page === Pages.BaerReplicationView) {
    //if we are replicating and the current report is not gathering data, invalid
    if (gatheringData === undefined || !gatheringData) {
      //navigate to home
      dispatch(setPage(Pages.Homepage));
      return <Redirect to={Pages.Homepage} />
    }
  }



  return page !== curPage ? <Redirect to={page} /> : null;
}
