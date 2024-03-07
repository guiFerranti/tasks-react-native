import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

import todayImage from '../../assets/imgs/today.jpg'
import moment from 'moment';
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles';
import Task from '../components/Task';

export default class TaskList extends Component {
    
    render() {

        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')


        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                <View style={styles.titleBar}>
                    <Text style={styles.title} >
                        Hoje
                    </Text>
                    <Text style={styles.subtitle} >
                        {today}
                    </Text>
                </View>

                </ImageBackground>
                <View style={styles.taskList}>

                    <Task desc='Terminar o curso' estimateAt={new Date()} doneAt={null} /> 
                    <Task desc='Terminar o curso' estimateAt={new Date()} doneAt={new Date()} /> 

                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    title: {
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20,
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },


})