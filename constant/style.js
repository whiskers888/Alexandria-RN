import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";

export const gStyle = StyleSheet.create( {
    //                                      Login.js
    loadingScreen: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

    logo:{
        marginTop: 0,
        width:"80%",
        alignSelf:'center',
        resizeMode:'contain'
        
    },
    authSection: {
        display:'flex',
        flexDirection:'row',
        alignItems: 'center',        
        borderWidth: 1,
        borderRadius: 15,
        borderColor:"#4c85d4",
        margin: 10,
        paddingVertical: 0,
        paddingHorizontal: 6,
    },
    input: {
        width: "90%",
        paddingTop: 10,
        paddingBottom: 10,
        margin:5,
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around"
     },
    btnSubmit:{
        backgroundColor: "#fff",
        fontSize: 14,
        marginTop:15,
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderRadius: 26,
        borderWidth:1,
        borderColor:"#4c85d4",
        textTransform:"uppercase",
        fontWeight: 700,
        display: "flex",
        alignSelf:"center",
        alignItems: "center",
        width: "50%",
     },
    //                                      Main.js
    notification:{
      width:'99%',
      marginLeft:4,
      paddingVertical:8,
     },
    notificationName:{
        fontWeight:'bold',
        fontSize:16,
     },
    notificationItem:{
        paddingVertical:8,
        display:'flex',
        flexDirection:'row',
     },
    notificationTime:{
        fontSize:12,
        marginLeft:'auto'
     },
    borderNotification:{
        borderLeftWidth:6,
        paddingLeft:8,
        borderBottomLeftRadius:4
     },
    groupTimeNotif:{
        textAlign:'center',
        marginTop:12,
        color:"#808080"
    },
    notificationIsNew:{
        borderRadius:"50%",
        width:'5%',
        height:'90%',
        backgroundColor:'#33FF00',
        marginLeft:10,
        shadowColor:'#33FF00',
        shadowRadius:8,
        shadowOpacity:10,
        // shadowOffset:100
    },
    groupZachBook:{
        marginVertical:12,
        width:'99%',
        alignSelf:'center',
        backgroundColor:'#fafaff' // ebebeb
    },
    borderNameGroup:{
        width:'101%',
        borderColor:'#edf3fc',
        borderRadius:8,
        borderWidth:8,
        alignSelf:'center',
    },
    nameGroupZach:{
        backgroundColor:"#edf3fc",
        textAlign:'center',
        fontSize:14,
        fontWeight:'bold',
    },
    itemMark:{
        display:'flex',
        flexDirection:'row',
        padding:8
    },
    //                      PROFILE.JS
    cardFirstInfo:{
        height:'40%',
        borderBottomWidth:2,
        borderBottomColor:'#c1d7f7',
        borderRadius:15,
    },
    avatar:{
        alignSelf:'center',
        margin:8,
        width:'25%',
        height:'100%',
        borderWidth:2,
        borderRadius:100,
        borderColor:"#c1d7f7"
    },
    nameUser:{
        fontSize:16,
        fontWeight:"bold",
        paddingTop:12
    }
});