import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { fetchTodos, changeStatus } from '../store/actions/todoActions';

const TodosScreen = (props) => {
    useFocusEffect(React.useCallback(() => {
        props.fetchTodos();
    }, []));

    const getDescriptionStyle = ({ completed }) => {
        if (completed) {
            return { textDecorationLine: "line-through", fontStyle: 'italic', color: "#808080" };
        }
    }

    const clickEventListener = (item) => {
        const { id, completed } = item;
        Alert.alert(
            `Confirm`,
            `Mark as ${completed ? 'Incomplete' : 'Complete'}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => props.changeStatus(id, !completed) }
            ],
            { cancelable: false }
        );
    }

    const getColor = ({ completed }) => {
        return !completed ? 'red' : '#008B8B'
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.tasks}
                columnWrapperStyle={styles.listContainer}
                data={props.todos}
                keyExtractor={(item) => {
                    return item.id + "";
                }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={[styles.card, { borderLeftColor: getColor(item) }]} onPress={() => { clickEventListener(item) }}>
                            <View style={styles.cardContent}>
                                <Text style={[styles.description, getDescriptionStyle(item)]}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eeeeee"
    },
    tasks: {
        flex: 1,
    },
    cardContent: {
        marginLeft: 20,
        marginTop: 10,
    },
    image: {
        width: 25,
        height: 25,
    },

    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: "white",
        flexBasis: '46%',
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderLeftWidth: 6,
    },

    description: {
        fontSize: 18,
        flex: 1,
        color: "#008B8B",
        fontWeight: 'bold',
    }
});

const mapStateToProps = (state) => {
    return {
        todos: state.todos.todos
    }
}

export default connect(mapStateToProps, { fetchTodos, changeStatus })(TodosScreen);