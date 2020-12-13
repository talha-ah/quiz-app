import { createSwitchNavigator } from "@react-navigation/compat";
import AuthNavigator from "./AuthNavigator";
import StudentNavigator from "./StudentNavigator";
import TeacherNavigator from "./TeacherNavigator";

const ParentNavigator = createSwitchNavigator({
  welcomeNav: AuthNavigator,
  student: StudentNavigator,
  teacher: TeacherNavigator,
});

export default ParentNavigator;
