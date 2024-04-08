import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

// eslint-disable-next-line react-hooks/rules-of-hooks
const reactotron = Reactotron.useReactNative({
  editor: false,
  overlay: true,
})
  .use(reactotronRedux())
  .connect();

export default reactotron;
