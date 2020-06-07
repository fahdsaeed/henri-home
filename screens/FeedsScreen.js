import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import { useFocusEffect } from '@react-navigation/native';

import { fetchFeeds, deleteFeed, fetchComments, postFeed } from '../store/actions/feedsActions';
import Avatar from '../components/Avatar';
import Comments from '../components/Comments';
import FeedForm from '../components/FeedForm';
import { createLoadingSelector } from '../store/selectors/createLoadingSelector';

const FeedsScreen = (props) => {
    const [showComments, setShowComments] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showNewPost, setShowNewPost] = useState(false);
    useFocusEffect(React.useCallback(() => {
        props.fetchFeeds();
        props.fetchComments();
    }, []));

    const onDeleteFeed = ({ id }) => {
        Alert.alert(
            `Delete Confirm`,
            `Are you sure?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        setSelectedPost(id);
                        props.deleteFeed(id).then(() => {
                            setSelectedPost(null)
                        });
                    }
                }
            ],
            { cancelable: false }
        );
    }

    const getUserName = (userId) => {
        var user = props.users.find(u => u.id === userId);
        return user && user.name ? user.name.trim() : "";
    }

    const onShowComments = (id) => {
        setSelectedPost(id);
        setShowComments(true);
    }

    const getCommentsCount = (id) => {
        return props.comments.filter(c => c.postId === id).length + ' comments';
    }

    const onNewPost = () => {
        setShowNewPost(true);
    }

    const onSaveFeed = (feed) => {
        props.postFeed({ ...feed, userId: 1 }).then(() => {
            setShowNewPost(false);
        });
    }

    const { deleting } = props;

    return (
        <View style={styles.container}>
            <Comments visible={showComments} onClose={() => setShowComments(false)}
                comments={props.comments ? props.comments.filter(c => c.postId === selectedPost) : []} />
            <FeedForm visible={showNewPost} onClose={() => setShowNewPost(false)} onSave={(feed) => onSaveFeed(feed)} />
            <FlatList style={styles.list}
                data={props.feeds}
                keyExtractor={(item) => {
                    return item.id + "";
                }}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={styles.separator} />
                    )
                }}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Avatar styles={styles.avatar} source={require('../assets/Images/user.png')} />
                                <View style={styles.postInfo}>
                                    <Text style={styles.name}>{getUserName(item.userId)}</Text>
                                    <Text style={styles.title}>{item.title}</Text>
                                </View>
                                <TouchableOpacity onPress={() => onDeleteFeed(item)}>
                                    {deleting && selectedPost === item.id ?
                                        <ActivityIndicator size="large" color="#008B8B" /> :
                                        <Text>
                                            <FontAwesome5 name={'trash'} color={'red'} size={20} />
                                        </Text>
                                    }
                                </TouchableOpacity>
                            </View>
                            <View style={styles.cardContent}>
                                <Text style={styles.description}>{item.body}</Text>
                            </View>
                            <View style={styles.cardFooter}>
                                <View style={styles.socialBarContainer}>
                                    <TouchableOpacity style={styles.socialBarButton} onPress={() => onShowComments(item.id)}>
                                        <View style={styles.socialBarSection}>
                                            <Text style={styles.socialBarLabel}>{getCommentsCount(item.id)}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                }} />
            <ActionButton buttonColor="#008B8B" title="New Feed" onPress={() => onNewPost()} />
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 30,
        width: 60,
        height: 60,
    },
    name: {
        fontSize: 18,
        flex: 1,
        color: '#008B8B',
        fontWeight: 'bold'
    },
    postInfo: {
        flexDirection: 'column',
        marginHorizontal: 10,
        flex: 1,
    },
    title: {
        fontSize: 16,
        flex: 1,
    },
    container: {
        flex: 1,
    },
    list: {
        paddingHorizontal: 10,
        backgroundColor: "#E6E6E6",
    },
    separator: {
        marginTop: 10,
    },
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 5,
        backgroundColor: "white"
    },
    cardHeader: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContent: {
        paddingHorizontal: 15,
        paddingBottom: 10
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 12.5,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
        backgroundColor: "#EEEEEE",
    },
    description: {
        fontSize: 15,
        color: "#888",
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
    },
    icon: {
        width: 25,
        height: 25,
    },
    socialBarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    socialBarSection: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    socialBarlabel: {
        marginLeft: 8,
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    socialBarButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const mapStateToProps = (state) => {
    return {
        feeds: state.feeds.feeds,
        users: state.users.users,
        avatars: state.users.avatars,
        comments: state.feeds.comments,
        deleting: createLoadingSelector(['DELETE_FEED'])(state)
    }
}

export default connect(mapStateToProps, { fetchFeeds, deleteFeed, fetchComments, postFeed })(FeedsScreen);