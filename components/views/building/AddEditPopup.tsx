import React, { useState, useCallback, memo } from 'react';
import Popup from '../../primitives/Popup';
import Label from '../../primitives/Label';
import TextInput from '../../primitives/TextInput';
import Container from '../../primitives/Container';
import Button from '../../primitives/Button';

interface IBuildingAddEditPopupProps {
    name?: string,
    onPressCancel: () => void,
    onPressSave: (name: string) => void
}
const BuildingAddEditPopup = (props: IBuildingAddEditPopupProps) => {

    const { onPressCancel, onPressSave, name } = props;

    const [buildingName, setBuildingName] = useState<string>(name ?? '');

    const onPressSaveInner = useCallback(() => { onPressSave(buildingName) }, [buildingName]);

    return (<Popup>
        <Container marginHorizontal='small'>
            <Label type='bold'>{'Nazwa:'}</Label>
            <TextInput value={buildingName} onChangeText={setBuildingName} placeholder='Wprowadź nazwę budowy...' />
        </Container>
        <Container moveToBottom flexDirection='row'>
            <Container><Button iconName='window-close' title='Anuluj' onPress={onPressCancel}></Button></Container>
            <Container><Button iconName='save' title='Zapisz' onPress={onPressSaveInner}></Button></Container>
        </Container>
    </Popup>);
}

export default memo(BuildingAddEditPopup);