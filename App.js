import React, { useEffect, useState} from 'react'
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { initializeApp } from'firebase/app';
import { getDatabase, push, ref, onValue } from'firebase/database';


export default function App() {
  const [product, setProduct] = useState('')
  const [amount, setAmount] = useState('')
  const [items, setItems] = useState([])

  const firebaseConfig = {
    apiKey: "AIzaSyDwyFmnc2plOVIaZ6KG9N1hMdhHOFfzREY",
    authDomain: "shoppinglistapp-e0563.firebaseapp.com",
    databaseURL:'https://shoppinglistapp-e0563-default-rtdb.europe-west1.firebasedatabase.app/',
    projectId: "shoppinglistapp-e0563",
    storageBucket: "shoppinglistapp-e0563.appspot.com",
    messagingSenderId: "429050181120",
    appId: "1:429050181120:web:2f76aa2f586ba76a390ae5",
    measurementId: "G-Y6YZW16D0D"
  };
  
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  
  ref(database,'items/')

  const saveItem = () => { 
    push(    
    ref(database, 'items/'),
       { 'product': product, 'amount': amount });}
  
   useEffect(() => {
      const itemsRef = ref(database, 'items/'); 
      onValue(itemsRef, (snapshot) => 
     {const data = snapshot.val(); 
       setItems(Object.values(data));
           })}, []);
  
     const listSeparator = () => {
      return (
        <View
          style={{
            height: 5,
            width: "80%",
            backgroundColor: "#fff",
            marginLeft: "10%"
          }}
        />
      );
    };

    
    

     return (
    <View style={styles.container}>
      <TextInput style={{ marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
         placeholder='Product' 
         onChangeText={product => setProduct(product)}
         value={product}/>
      <TextInput style={{ marginTop: 5, marginBottom: 5, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
         placeholder='Amount'
         onChangeText={amount => setAmount(amount)} 
         value={amount}/>
      <Button onPress={saveItem}title="Save" />
      <Text style={{ marginTop: 30, fontSize: 20 }}>Shopping list</Text>
      <FlatList style={{marginLeft : "5%"}} 
         key={item=>item.id}
         keyExtractor={item => item.id} 
         renderItem={({item}) =>
        <View style={styles.listcontainer}>
        <Text style={{ fontSize: 18 }}>{item.product},{item.amount} </Text>
        </View>}    
        ItemSeparatorComponent={listSeparator} 
        data={items} /> 
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
