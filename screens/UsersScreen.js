import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { fetchUsers, fetchAvatars } from '../store/actions/usersActions';
import Row from '../components/Row';
import Avatar from '../components/Avatar';

const UsersScreen = (props) => {
    const [users, setUsers] = useState([]);
    const [avatars, setAvatars] = useState([]);

    useFocusEffect(React.useCallback(() => {
        props.fetchUsers().then(() => {
            if (props.users && props.users.length > 0) {
                props.fetchAvatars(props.users.length).then(() => {
                    setAvatars(props.avatars);
                });
            }
            setUsers(props.users);
        });
    }, []));

    return (
        <View style={{ flex: 1 }} >
            <FlatList
                data={users}
                keyExtractor={(item) => item.username}
                renderItem={({ item, index }) => (
                    <Row>
                        <Avatar styles={styles.avatar} source={avatars[index] ? { uri: avatars[index].photo } : require('../assets/Images/user.png')} />
                        <View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                            </View>
                            <View style={styles.msgContainer}>
                                <Text style={styles.msgTxt}>{item.email}</Text>
                            </View>
                        </View>
                    </Row>
                )} />
        </View>
    );
}


const styles = StyleSheet.create({
    avatar: {
        borderRadius: 30,
        width: 60,
        height: 60,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 18,
    },
    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: '#008B8B',
        fontSize: 12,
        marginLeft: 15,
    },
});

const mapStateToProps = (state) => {
    return {
        users: state.users.users,
        avatars: state.users.avatars
    };
}

export default connect(mapStateToProps, { fetchUsers, fetchAvatars })(UsersScreen);