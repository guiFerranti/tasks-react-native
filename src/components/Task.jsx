import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import commonStyles from '../commonStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome'


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
                <Text>
                    Nao
                </Text>
            </View>
        )
    }


}


export default props => {

    return (
        <View style={styles.container}>
            <View style={styles.checkContainer}>
                {getCheckView(props.doneAt)}
            </View>
            <View>
                <Text style>{props.desc}</Text>
                <Text style>{props.estimateAt + ''}</Text>
            </View>
            
        </View>

    )


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
    }
})