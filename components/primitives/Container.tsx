import React, { ReactNode, useCallback, memo } from 'react';
import { View, StyleSheet } from 'react-native';

interface IContainerProps {
    children: ReactNode,
    flexDirection?: 'column' | 'row',
    justifyContent?: 'space-between' | 'center',
    moveToBottom?: boolean,
    marginHorizontal?: 'small' | 'normal'
    marginVertical?: 'small' | 'normal',
    adjustContent?: boolean,
}

const Container = (props: IContainerProps) => {

    const { children, flexDirection, justifyContent, moveToBottom, marginHorizontal, marginVertical, adjustContent } = props

    const getStyles = useCallback(() => {

        const styles = stylesFactory(flexDirection, justifyContent);

        const styleArray = [];

        styleArray.push(styles.contentAligment)

        if (!adjustContent) {
            styleArray.push(styles.flexContainer);
        }
        if (moveToBottom) {
            styleArray.push(styles.positionAbsolute);
        }

        switch (marginVertical) {
            case 'small':
                styleArray.push(styles.smallVerticalMargin);
                break;
            case 'normal':
                styleArray.push(styles.normalVerticalMargin);
                break;
        }

        switch (marginHorizontal) {
            case 'small':
                styleArray.push(styles.smallHorizontalMargin);
                break;
            case 'normal':
                styleArray.push(styles.normalHorizontalMargin);
                break;
        }

        return styleArray

    }, [adjustContent, moveToBottom, justifyContent, flexDirection, marginHorizontal, marginVertical])

    return (<View style={getStyles()}>
        {children}
    </View>)
}

export default memo(Container);


const stylesFactory = (flexDirection: 'row' | 'column' | undefined, justifyContent: 'space-between' | 'center' | undefined ) => StyleSheet.create({
    flexContainer: {
        flex: 1,

    },
    contentAligment: {
        flexDirection: flexDirection,
        justifyContent: justifyContent
    },
    positionAbsolute: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    },
    smallHorizontalMargin: {
        marginLeft: 5,
        marginRight: 5
    },
    smallVerticalMargin: {
        marginTop: 5,
        marginBottom: 5
    },
    normalHorizontalMargin: {
        marginLeft: 15,
        marginRight: 15
    },
    normalVerticalMargin: {
        marginTop: 15,
        marginBottom: 15
    }
});
