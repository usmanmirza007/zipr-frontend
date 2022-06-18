// ReactotronConfig.js
import Reactotron from 'reactotron-react-native'
// import { reactotronRedux } from 'reactotron-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

// then add it to the plugin list
const reactotron = Reactotron
  .setAsyncStorageHandler(AsyncStorage)  
  .configure({host: "192.168.18.238"})
//   .use(reactotronRedux()) //  <- here i am!
  .useReactNative() // add all built-in react native plugins
  .connect() //Don't forget about me!
  
export default reactotron
