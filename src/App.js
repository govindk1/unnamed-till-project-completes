

//components
import Signup from "./component/auth/Signup.js"

//react redux
import { Provider } from 'react-redux';
import store from './store/store.js';
import Alert from "./component/layout/Alert.js";


const App = () => {
  return (
    <Provider store={store}>
      <Alert />
      <Signup />
    </Provider>
  );
}

export default App;
