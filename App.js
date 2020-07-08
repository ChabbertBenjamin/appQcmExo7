import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {Text, Button, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import Constants from 'expo-constants';

const Stack = createStackNavigator();
var holomorphie = require("./data/holomorphie.json");
var homotopie3 = require("./data/homotopie3.json");


function Accueil({ navigation }) {
  return (
    <View>

      <Text>
      Chaque réponse correcte rapporte un point, chaque réponse incorrecte enlève un point.
      Le nombre de points et la note globale sont affichés à la fin des questions.
      Pour commencer, choisissez un thème dans le menu en haut de l'écran.
      Lorsque toutes les questions du thème auront été traitées, un écran récapitulera la note et son détail.
      L'application peut octroyer un bonus de points en fonction de la rapidité de la réponse si celle ci est correcte.
      </Text>
      
      <Text>Liste des thèmes : </Text>
    
    <Button
      title="Homotopie3"
      onPress={() => {
        navigation.navigate('QCM', {
          themeName: "Homotopie3",
          json: homotopie3,
        });
      }}
    />
    <Button
      title="Holomorphie"
      onPress={() => {
        navigation.navigate('QCM', {
          themeName: "Holomorphie",
          json : holomorphie,
        });
      }}
    />
    </View>
  );
}
function Reponse({  id, title, selected, onSelect  }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? '#cafe8c' : '#ffffff' },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

function QCM({ navigation, route }) {
  const { themeName } = route.params;
  const { json } = route.params;
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );

  console.log("gogogo")

  return (
    <View>
      <Text>{json[0].question}</Text>
      
      <SafeAreaView >
          <FlatList
            data={json[0].answers}
            renderItem={({ item }) => <Reponse title={item.value} selected={!!selected.get(item.value)} onSelect={onSelect} id={item.value}/>}
            keyExtractor={item => item.value}
          />
      </SafeAreaView>
     
    

      <Button
      title="Valider"
      onPress={() => {
        navigation.navigate('QCM', {
          themeName: themeName,
          json : json.splice(0,1),
        });
      }}
    />
      <Button title="GO BACK" onPress={() => navigation.goBack()} />

    </View>
  );
}

export default function App() {
  
  
  return (

    <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen
          name="Accueil"
          component={Accueil}
          options={{ title: 'Règle du jeu' }}
        />
        <Stack.Screen 
          name="QCM" 
          component={QCM}/>
        
      </Stack.Navigator>
    </NavigationContainer> 
   
    
    


  );
  
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 10,
  },
});