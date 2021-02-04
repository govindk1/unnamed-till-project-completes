

//components
import Signup from "./component/auth/Signup.js"

//react redux
import { Provider } from 'react-redux';
import store from './store/store.js';


const App = () => {
  return (
    <Provider store={store}>
      <Signup />
    </Provider>
  );
}

export default App;
