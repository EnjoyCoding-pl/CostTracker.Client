import React, { ReactNode, memo } from 'react';
import { StyleSheet, View } from 'react-native';

interface IPopupProps {
    children: ReactNode,
}
const Popup = (props: IPopupProps) => {

    const { children } = props;

    return <View style={styles.container}>
        {children}
    </View>;
}

export default memo(Popup);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
        zIndex: 1,
        shadowColor: 'black',
        shadowOpacity: .5,
        shadowRadius: 4,
        elevation: 6,
        padding: 10,
        backgroundColor: 'white'
    }
})