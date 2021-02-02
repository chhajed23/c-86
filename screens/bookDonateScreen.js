import * as React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
import MyHeader from "../components/myHeader";
import db from "../config";


export default class DonateScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      requestedBookList: [],
    };
    this.requestRef = null;
  }

  getRequestedBookList = () => {
    this.requestRef = db
      .collection("requested_books")
      .onSnapshot((snapshot) => {
        var requested_books = snapshot.docs.map((document) => document.data());
        this.setState({
          requestedBookList: requested_books,
        });
      });
  };

  componentDidMount() {
    this.getRequestedBookList();
  }
  componentWillUnmount() {
    this.requestRef();
  }
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.book_name}
        subtitle={item.reason_for_request}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        rightElement={
          <TouchableOpacity style={styles.button}
          onPress={()=>{
            this.props.navigation.navigate("ReceiverDetail",{"details":item})
          }}>
            <Text style={{ color: "#ffff" }}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Donate Books"  navigation ={this.props.navigation}/>
        <View style={{ flex: 1 }}>
          {this.state.requestedBookList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}> List of all requested books</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.requestedBookList}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
});
