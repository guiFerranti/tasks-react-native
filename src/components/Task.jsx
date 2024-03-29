import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import commonStyles from '../commonStyles'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'

export default props => {

    const doneOrNotStyle = props.doneAt != null ?
        { textDecorationLine: 'line-through' } : {}

    const data = props.doneAt ? props.doneAt : props.estimateAt
    const formatredDate = moment(data).locale('pt-br').format('ddd, D [de] MMMM') 

    return (

        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPress={() => props.toggleTask(props.id)}
            >
                <View style={styles.checkContainer}>
                    {getCheckView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                <Text style={styles.date}>{formatredDate}</Text>
            </View>
            
        </View>
    )

}

function getCheckView(doneAt) {

    if (doneAt != null) {

        return (
                <View style={styles.done}>
                    <FontAwesome name='check' size={20} color='#fff' />
                </View>
        )
    } else {
        return (
            <View style={styles.pending}>
            </View>
        )
    }


}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#aaa',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4d7031',
        justifyContent: 'center',
        alignItems: 'center'
    },
    desc: {
        fontFamily: commonStyles.colors.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: commonStyles.colors.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12
    }
})