import { StyleSheet } from "react-native";

export const gStyle = StyleSheet.create( {
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
        

     }
    //  background: #fff;
	// font-size: 14px;
	// margin-top: 30px;
	// padding: 16px 20px;
	// border-radius: 26px;
	// border: 1px solid #D4D3E8;
	// text-transform: uppercase;
	// font-weight: 700;
	// display: flex;
	// align-items: center;
	// width: 100%;
	// color: #4C489D;
	// box-shadow: 0px 2px 2px #5C5696;
	// cursor: pointer;
	// transition: .2s;
});