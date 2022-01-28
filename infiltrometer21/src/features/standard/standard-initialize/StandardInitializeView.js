//The Page we are displaying for the standard Initialize view

import { Protocols } from '../../reports/protocols'
import InitializeView from '../../reused-components/initialize-views/InitializeView';

const StandardInitializeView = () => {
  return <InitializeView protocol={Protocols.Standard} />
}
export default StandardInitializeView;