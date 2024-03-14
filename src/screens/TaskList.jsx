import React, { Component } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, View, Platform, TouchableOpacity, Alert } from 'react-native';

import todayImage from '../../assets/imgs/today.jpg'
import moment from 'moment';
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles';
import Task from '../components/Task';
import Icon from 'react-native-vector-icons/FontAwesome'
import AddTask from './AdicionarTask';

export default class TaskList extends Component {
    
    state = {
        showDoneTasks: true,
        showAddTaskModal: false,
        visibleTasks: [

        ],
        tasks: [
            {
            id: Math.random(),
            desc: 'Compra curso React',
            estimateAt: new Date(),
            doneAt: new Date(),
            },
            {
            id: Math.random(),
            desc: 'Compra curso React 2',
            estimateAt: new Date(),
            doneAt: new Date(),
            },
        ]
    }

    addTask = newTask => {
        if(!newTask.desc.trim() || !newTask.desc) {
            Alert.alert('Dados inválidos', 'Descrição não informada!')
            return
        }

        const tasks = [...this.state.tasks]

        tasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            doneAt: null
        })

        this.setState({ tasks, showAddTaskModal: false }, this.filterTasks)
    }

    componentDidMount = () => {
        this.filterTasks()
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null;
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pendingTasks = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pendingTasks)
            
        }

        this.setState({ visibleTasks })
    }

    toggleTask = taskId => {
        const tasks =[...this.state.tasks]

        tasks.forEach(task => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })
        this.setState({ tasks: tasks }, this.filterTasks)
    }

    render() {

        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')


        return (
            <View style={styles.container}>
                <AddTask  
                    isVisible={this.state.showAddTaskModal} 
                    onCancel={() => this.setState({ showAddTaskModal: false })}
                    onSave={this.addTask}
                />
                <ImageBackground source={todayImage} style={styles.background}>

                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter} >
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash' }
                                size={20} color={commonStyles.colors.secondary}
                            />
                        </TouchableOpacity>
                    </View>

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
                    <FlatList
                        data={this.state.visibleTasks}
                        keyExtractor= {item => `${item.id}`}
                        renderItem={({item}) => <Task 
                            toggleTask={this.toggleTask}
                            {...item} /> }
                    />
                </View>
                <TouchableOpacity style={styles.addButton} activeOpacity={0.7}
                    onPress={() => 
                        this.setState({ showAddTaskModal: true })
                    }
                >
                    <Icon name='plus' size={20} color={commonStyles.colors.secondary} />     
                </TouchableOpacity>
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
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 30 : 10,

    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        alignItems: 'center',
        justifyContent: 'center'
    }

})