import * as React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import firebase from "firebase";
import MyHeader from "../components/myHeader";
import db from "../config";
import { Header } from "react-native/Libraries/NewAppScreen";

export default class SettingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      first_name: "",
      last_name: "",
      contact_number: "",
      address: "",
      docId: "",
    };
  }

  getUserDetails = () => {
    var user = firebase.auth().currentUser;
    var email = user.email;
    db.collection("users")
      .where("username", "==", email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            emailId: data.username,
            first_name: data.first_name,
            last_name: data.last_name,
            address: data.address,
            contact_number: data.contact_number,
            docId: doc.id,
          });
        });
      });
  };

  updateUserDetails = () => {
    db.collection("users").doc(this.state.docId).update({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      address: this.state.address,
      contact_number: this.state.contact_number,
    });
    Alert.alert("Profile Updated Successfully");
  };

  componentDidMount() {
    this.getUserDetails();
  }

  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="Profile Settings" navigation={this.props.navigation} />

        <View style={styles.formContainer}>
          <TextInput
            style={styles.formTextInput}
            placeholder="First Name"
            maxLength={8}
            value={this.state.first_name}
            onChangeText={(text) => {
              this.setState({
                first_name: text,
              });
            }}
          />

          <TextInput
            style={styles.formTextInput}
            placeholder="Last Name"
            maxLength={10}
            value={this.state.last_name}
            onChangeText={(text) => {
              this.setState({
                last_name: text,
              });
            }}
          />

          <TextInput
            style={styles.formTextInput}
            placeholder="Contact Number"
            maxLength={10}
            keyboardType="numeric"
            value={this.state.contact_number}
            onChangeText={(text) => {
              this.setState({
                contact_number: text,
              });
            }}
          />

          <TextInput
            style={styles.formTextInput}
            placeholder="Address"
            multiline={true}
            value={this.state.address}
            onChangeText={(text) => {
              this.setState({
                address: text,
              });
            }}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              this.updateUserDetails();
            }}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  formContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ffab91",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  saveButton: {
    width: 200,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: "orange",
  },
  saveButtonText: {
    color: "#ff5722",
    fontSize: 15,
    fontWeight: "bold",
  },
});
