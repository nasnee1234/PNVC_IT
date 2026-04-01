import { View, Text, StyleSheet, Image } from 'react-native'; 

export default function CardScreen() {

 return (
   <View style={styles.container}>
     <Text style={styles.text}>Card</Text>
   </View>
 );
}

const styles = StyleSheet.create({

 container: { flex: 1, justifyContent: 'center', alignItems: 'center' },  
 text: { fontSize: 20,   fontWeight: 'bold' }, 
});