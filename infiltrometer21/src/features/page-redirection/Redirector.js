import { useSelector } from "react-redux";
import { selectPage } from "./redirector-slice";
import { useLocation, Redirect } from "react-router";

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
  ReportsView: "/reports",
  NewBaerManual: "/manuals-newBaer"
}

//Used to redirect to new pages from global state
export const Redirector = ({ protectedElements }) => {
  const curPage = useLocation().pathname;   // Current URL in browser
  const page = useSelector(selectPage);     // Current URL in Redux store
  // If the URLs match, we render the protected elements (JSX passed as a prop to this component)
  // If the URLs do not match, we render a redirect message to the valid url
  return page !== curPage ? <Redirect to={page} /> : protectedElements;
}
