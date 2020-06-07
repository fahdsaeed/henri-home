import React, { useState } from 'react'
import { Modal, Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { createLoadingSelector } from '../store/selectors/createLoadingSelector';

const FeedForm = (props) => {
    const [feed, setFeed] = useState({
        title: '',
        body: ''
    });
    const { savingFeed } = props;

    return (
        <Modal visible={props.visible} transparent={true} onRequestClose={() => props.onClose()}
            onShow={() => setFeed({ title: '', body: '' })}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.heading}>New Feed</Text>
                    {savingFeed ?
                        <ActivityIndicator size="large" color="#008B8B" />
                        : <TouchableOpacity onPress={() => props.onSave(feed)}><Text style={styles.headingAction}>Save</Text>
                        </TouchableOpacity>}
                </View>
                <ScrollView style={styles.content}>
                    <View style={{ marginHorizontal: 10 }}>
                        <TextInput placeholder="Title" maxLength={50} style={{ fontWeight: 'bold', fontSize: 18 }} onChangeText={(text) => setFeed({ ...feed, title: text })} value={feed.title} />
                    </View>
                    <View style={{ marginHorizontal: 10 }}>
                        <TextInput placeholder="Feed" maxLength={500} multiline={true} style={{ fontSize: 18 }} onChangeText={(text) => setFeed({ ...feed, body: text })} value={feed.body} />
                    </View>
                </ScrollView>
            </View>
        </Modal >
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1
    },
    header: {
        marginHorizontal: 10,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#00000021',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 15,
        color: '#008B8B',
    },
    headingAction: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 15
    },
    content: {
        flex: 1
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
        fontSize: 12,
        marginLeft: 15,
    },
});

const mapStateToProps = (state) => {
    return {
        savingFeed: createLoadingSelector(['POST_FEED'])(state)
    };
}

export default connect(mapStateToProps, {})(FeedForm);