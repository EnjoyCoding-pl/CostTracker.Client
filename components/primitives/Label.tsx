import React, { ReactNode, useCallback, memo } from 'react';
import { Text, StyleSheet } from 'react-native';

interface ILabelProps {
    children: ReactNode,
    type?: 'grayout' | 'bold',
    center?: boolean
}

const Label = (props: ILabelProps) => {

    const { children, type, center } = props;

    const getStyle = useCallback(() => {

        const styleArray = []

        if (center) {
            styleArray.push(styles.centerText);
        }

        switch (type) {
            case 'bold':
                styleArray.push(styles.boldText);
                break;
            case 'grayout':
                styleArray.push(styles.grayoutText);
                break;
        }
        return styleArray;
    }, [type]);

    return (<Text style={getStyle()}>
        {children}
    </Text>)
}

export default memo(Label);

const styles = StyleSheet.create({
    boldText: {
        fontWeight: 'bold'
    },
    grayoutText: {
        color: 'gray'
    },
    centerText: {
        textAlign: 'center'
    }
});