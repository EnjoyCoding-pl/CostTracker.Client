import React, { memo } from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

interface ITextInputProps {
    value: string,
    onChangeText: (value: string) => void;
    placeholder?: string,
    type?: 'text' | 'number'
}

const TextInput = (props: ITextInputProps) => {
    
    const { value, onChangeText, placeholder, type } = props

    return (<NativeTextInput
        keyboardType={type === 'number' ? 'number-pad' : 'default'}
        style={styles.textInput}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
    />);
}

export default memo(TextInput);

const styles = StyleSheet.create({
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    }
})