import React, { ReactNode, useCallback, memo } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

interface IListItemProps {
    children: ReactNode,
    onPress: (key: string) => void
    id: string
}

const ListItem = (props: IListItemProps) => {

    const { children, onPress, id } = props;

    const onPressInner = useCallback(() => { onPress(id) }, [id])

    return (
        <TouchableOpacity style={styles.listItem} onPress={onPressInner}>
            {children}
        </TouchableOpacity>
    );
}

export default memo(ListItem);

const styles = StyleSheet.create({
    listItem: {
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderRadius: 10,
        margin: 5,
        padding: 20
    },
})