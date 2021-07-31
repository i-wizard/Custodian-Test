import NetInfo from "@react-native-community/netinfo";
export default class NetworkCheck {
  static async isNetworkAvailable() {
    const response = await NetInfo.fetch();
    return response.isConnected;
}}