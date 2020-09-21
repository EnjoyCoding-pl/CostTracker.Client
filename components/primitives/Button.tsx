import React, { memo } from 'react';
import { Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

interface IButtonProps {
    iconName: string,
    onPress: () => void,
    disabled?: boolean,
    title: string
}

const Button = (props: IButtonProps) => {

    const { iconName, onPress, disabled, title } = props;

    return (<View style={styles.buttonContainer}>
        <Icon.Button
            style={styles.button}
            name={iconName}
            borderRadius={20}
            disabled={disabled}
            onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </Icon.Button>
    </View>)
}

export default memo(Button);

const styles = StyleSheet.create({
    buttonContainer: {
        margin: 10
    },
    button: {
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    }
})
