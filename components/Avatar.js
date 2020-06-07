import React from 'react'
import { StyleSheet, Image } from 'react-native'

const Avatar = ({ styles, source }) => {
    return <Image source={source} style={styles} />;
}
export default Avatar;