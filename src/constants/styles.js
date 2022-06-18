import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    backgroundColor: "transparent",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: "#4C4C4C"
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#2A2A2A",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    alignSelf: 'center',
  },
  loginText: {
    color: "white",
    alignSelf: 'center'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  },
  heading1: {
    fontSize: 30,
    color: "white",
    marginVertical: 10,
    alignSelf: 'center',
    marginTop: 30
  },
  info: {
    fontSize: 14,
    color: "white",
    marginBottom: 20,
    alignSelf: 'center'
  },
  or: {
    color: "white",
    fontSize: 11,
    marginTop: 20,
    alignSelf: 'center'
  },
});