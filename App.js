import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {Text, Button, navigation, View, TextInput} from 'react-native'
import $ from 'jquery'

const Stack = createStackNavigator();

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
      
      <Text>Liste des thèmes : 
      </Text>
    
    <Button
      title="Homotopie3"
      onPress={() => {
        navigation.navigate('QCM', {
          themeName: "Homotopie3",
        });
      }}
    />
    <Button
      title="Holomorphie"
      onPress={() => {
        navigation.navigate('QCM', {
          themeName: "Holomorphie",
        });
      }}
    />
    </View>
  );
}

function QCM({ navigation, route }) {
  const { themeName } = route.params;
  return (
    $.get('data/' + {themeName} + '.json', function (d) {
      // création et affectation d'un objet 'theme' vide:
      var themeobj = new Object();
      themeobj.nom = nom;
      themeobj.info = "";
      themeobj.data = {};
      this.themes = [themeobj];
      if($.type(d[0]) === "string"){
          this.themes[0].info=d.splice(0,1);
      }
      this.themes[0].data=d;//remplissage avec les données:
      console.log(this.theme[0])
      app.demarrerTheme(nom, this.themes[0]);
  },"json"), //getJSON ne marche pas, pb de callback  ?... 
    <View>
     <Text>{themeName}</Text>
     <Button title="Go back" onPress={() => navigation.goBack()} />
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
