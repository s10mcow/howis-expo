import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Auth } from "aws-amplify";

import { useAuthenticator } from "@aws-amplify/ui-react-native";

export default function Profile() {
  const { user: awsUser, signOut } = useAuthenticator((context) => [
    context.user,
  ]);
  useEffect(() => {
    (async function () {
      const user = await Auth.currentAuthenticatedUser();
      const token =
        user.getSignInUserSession()?.getAccessToken().getJwtToken() ?? "";
      console.log("token", token);
    })();
  }, []);
  const user = awsUser.attributes;
  const handleResetPassword = () => {
    console.log("Reset password...");
    // Add reset password logic here
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: user?.picture }} />
      </View>
      <Text style={styles.name}>{user?.given_name}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#ff1e1e",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
