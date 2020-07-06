import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import { render } from 'react-dom'

export default class About extends React.Component{
    HomeScreen ( navigation ) {
     
    }

    render() {
        return (
            <View>
                <Text>Salut</Text>
                <Button title="Go back" onPress={() => navigation.goBack()} />


            </View>


        )
    }
}