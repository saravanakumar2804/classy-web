// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AppRouting from './Routing/route';
import { firebaseConfig } from './firebase/firebase.config';
import { FirebaseLoginService } from './firebase';


export function App() {
  new FirebaseLoginService().initialize(firebaseConfig);

  return (
    <div>
      <AppRouting />
    </div>
  );
}

export default App;
