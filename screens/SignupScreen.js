import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { createUser } from "../util/auth";

function SignupScreen() {
  const [isAuthentication, setIsAuthentication] = useState(false);

  const authCtx = useContext(AuthContext);

  const signupHandler = async ({ email, password }) => {
    setIsAuthentication(true);

    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "please check your input and try again later"
      );
      setIsAuthentication(false);
    }
  };

  if (isAuthentication) {
    return <LoadingOverlay message="Creating User......" />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
