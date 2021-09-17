//The Page we are displaying for the baer Initialize view
import { Link } from 'react-router-dom';
import React from 'react';

const BaerReplicationView = () => {
  return (<div>
    <div>
      Bear Replication View
    </div>
      <Link to ="/Infiltrometer/baer-results">To Results View</Link>
    
    </div>);
}
export default BaerReplicationView;