import React, { useState, useCallback, memo } from 'react';
import Popup from '../../primitives/Popup';
import Label from '../../primitives/Label';
import TextInput from '../../primitives/TextInput';
import DatePicker from 'react-native-date-picker';
import Container from '../../primitives/Container';
import Button from '../../primitives/Button';
import { Part } from 'models/Part';
import List from '../../primitives/List';

interface PartAddEditPopupProps {
    onPressCancel: () => void,
    onPressSave: (part: { name: string, startDate: string, endDate: string, budget: number }) => void,
    part?: Part,
}

const PartAddEditPopup = (props: PartAddEditPopupProps) => {

    const { onPressCancel, onPressSave, part } = props;

    const [innerPart, setInnerPart] = useState<{ name: string, startDate: Date, endDate: Date, budget: string }>({
        name: part?.name ?? '',
        startDate: part ? new Date(part.startDate) : new Date(),
        endDate: part ? new Date(part.endDate) : new Date(),
        budget: part?.budget.toFixed(2) ?? ''
    });

    const pressSave = useCallback(() => {
        onPressSave({
            name: innerPart.name,
            budget: parseFloat(innerPart.budget),
            startDate: innerPart.startDate.toISOString(),
            endDate: innerPart.endDate.toISOString()
        })
    }, [innerPart]);

    return (<Popup>
        <List>
            <Container marginHorizontal='small'>
                <Container marginVertical='normal'>
                    <Label type='bold'>{'Nazwa:'}</Label>
                    <TextInput value={innerPart.name} onChangeText={value => { setInnerPart({ ...innerPart, name: value }); }} />
                </Container>
                <Container marginVertical='normal'>
                    <Label type='bold'>{'Budżet:'}</Label>
                    <TextInput type='number' value={innerPart.budget} onChangeText={value => { setInnerPart({ ...innerPart, budget: value }); }} />
                </Container>
                <Container marginVertical='normal'>
                    <Label type='bold'>{'Data rozpoczęcia:'}</Label>
                    <DatePicker
                        date={innerPart.startDate}
                        onDateChange={date => { setInnerPart({ ...innerPart, startDate: date }); }}
                        mode='date' />
                </Container>
                <Container marginVertical='normal'>
                    <Label type='bold'>{'Data zakończenia:'}</Label>
                    <DatePicker
                        date={innerPart.endDate}
                        onDateChange={date => { setInnerPart({ ...innerPart, endDate: date }); }}
                        mode='date' />
                </Container>
            </Container>
        </List>
        <Container moveToBottom flexDirection='row'>
            <Container><Button iconName='window-close' title='Anuluj' onPress={onPressCancel}></Button></Container>
            <Container><Button iconName='save' title='Zapisz' onPress={pressSave}></Button></Container>
        </Container>
    </Popup>)
}

export default memo(PartAddEditPopup)