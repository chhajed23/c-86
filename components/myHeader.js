import * as React from "react";
import { Header, Icon, Badge } from "react-native-elements";
import { View } from "react-native";
import db from "../config";
import firebase from 'firebase';


export default class MyHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId:firebase.auth().currentUser.email,
      value: "",
    };
  }

   BellWithBadge = () => {
    return (
      <View>
        <Icon
          name="bell"
          type="font-awesome"
          color="#656565"
          size={25}
          onPress={() => {
            this.props.navigation.navigate("Notifications");
          }}
        />
        <Badge
          value={this.state.value}
          containerStyle={{ position: "absolute", top: -4, right: -4 }}
        />
      </View>
    );
  };

  getNumberOfUnreadNotifications = () => {
    db.collection("all_notifications")
      .where("notification_status", "==", "unread")
      .onSnapshot((snapshot) => {
        var unreadNotifications = snapshot.docs.map((doc) => {doc.data()});
        this.setState({
          value:unreadNotifications.length
        })
      });
  };

  componentDidMount(){
    this.getNumberOfUnreadNotifications()
  }

  render() {
    return (
      <Header
        leftComponent={
          <Icon
            name="bars"
            type="font-awesome"
            color="#656565"
            onPress={() => {
              this.props.navigation.toggleDrawer()
            }}
          />
        }
        rightComponent={<this.BellWithBadge {...this.props} />}
        centerComponent={{
          text: this.props.title,
          style: { color: "blue", fontSize: 20, fontWeight: "bold" },
        }}
        backgroundColor="#eaff23"
      />
    );
  }
}
