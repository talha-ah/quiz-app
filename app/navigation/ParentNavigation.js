import {createSwitchNavigator} from "@react-navigation/compat";
import LoadingScreen from "../screens/LoadingScreen";
import AuthNavigator from "./AuthNavigator";
import StudentNavigator from "./StudentNavigator";
import TeacherNavigator from "./TeacherNavigator";
//import LoadingScreen from "../screens/LoadingScreen";

const ParentNavigator = createSwitchNavigator({
    //"loading":LoadingScreen,
    "welcomeNav" : AuthNavigator,
    "student" :StudentNavigator,
    "teacher" :TeacherNavigator,
},
/*{
initialRouteName:"loading",
}*/
)

export default ParentNavigator;