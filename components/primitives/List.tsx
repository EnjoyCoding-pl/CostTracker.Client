import React, { ReactNode, memo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

interface IListProps {
    children: ReactNode
}

const List = (props: IListProps) => {

    const { children } = props;

    return (
        <ScrollView style={styles.scrollView}>
            {children}
        </ScrollView>
    );
}

export default memo(List);

const styles = StyleSheet.create({
    scrollView: {
        marginBottom: 50
    }
})