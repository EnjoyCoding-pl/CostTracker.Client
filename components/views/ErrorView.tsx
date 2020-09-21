import React, { memo, useCallback } from 'react';
import Label from '../../components/primitives/Label';
import Button from '../../components/primitives/Button';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Container from '../../components/primitives/Container';


const ErrorView = () => {

    const { goBack } = useNavigation();

    const clickReload = useCallback(() => { goBack() }, [])

    return (<Container marginHorizontal='normal' justifyContent='center'>
        <Container marginVertical='normal' adjustContent justifyContent='center'>
            <Icon name='frown-open' style={{ textAlign: 'center' }} size={100}></Icon>
        </Container>
        <Container adjustContent marginVertical='small'>
            <Label center type='bold'>
                {'Przepraszamy... Wystąpił nieoczekiwany błąd.'}
            </Label>
        </Container>
        <Container justifyContent='center' marginVertical='small' adjustContent>
            <Label center type='grayout'>
                {'Spróbuj ponownie naciśkając przycisk poniżej.'}
            </Label>
        </Container>
        <Container marginVertical='small' adjustContent>
            <Button onPress={clickReload} iconName='redo' title='Spróbuj ponownie' />
        </Container>
    </Container>
    )
}

export default memo(ErrorView);