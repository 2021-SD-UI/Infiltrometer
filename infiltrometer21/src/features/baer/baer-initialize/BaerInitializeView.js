
import { Protocols } from '../../reports/protocols';
import InitializeView from '../../reused-components/initialize-views/InitializeView';
const BaerInitializeView = () => {
  return (<InitializeView protocol={Protocols.Baer} />)
}

export default BaerInitializeView;