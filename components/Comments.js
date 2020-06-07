import React from 'react'
import { Modal, Text, StyleSheet, View, FlatList } from 'react-native';

import Row from '../components/Row';
import Avatar from '../components/Avatar';

const Comments = (props) => {

    return (
        <Modal visible={props.visible} transparent={true} onRequestClose={() => props.onClose()}>
            <View style={styles.backGround}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.heading}>Comments</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={props.comments}
                            keyExtractor={(item) => {
                                return item.id + "";
                            }}
                            renderItem={({ item }) => {
                                return (
                                    <Row>
                                        <Avatar styles={styles.avatar} source={require('../assets/Images/user.png')} />
                                        <View style={{ flex: 1 }}>
                                            <View style={styles.nameContainer}>
                                                <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                                            </View>
                                            <View style={styles.msgContainer}>
                                                <Text style={styles.msgTxt}>{item.body}</Text>
                                            </View>
                                        </View>
                                    </Row>
                                )
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    backGround: {
        backgroundColor: '#000000aa',
        flex: 1
    },
    container: {
        backgroundColor: '#ffffff',
        marginTop: 50,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flex: 1
    },
    header: {
        justifyContent: 'center',
        marginHorizontal: 10,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#00000021'
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 15
    },
    avatar: {
        borderRadius: 30,
        width: 60,
        height: 60,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#008B8B',
        fontSize: 18,
    },
    msgContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 15,
        backgroundColor: '#f2f3f5',
        paddingTop: 10,
        paddingBottom: 10
    },
    msgTxt: {
        fontWeight: '400',
        fontSize: 14,
        marginLeft: 15,
    },
});
export default Comments;