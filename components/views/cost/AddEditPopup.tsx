import React, { useState, memo, useCallback } from 'react';
import Popup from '../../primitives/Popup';
import Container from '../../primitives/Container';
import Label from '../../primitives/Label';
import TextInput from '../../primitives/TextInput';
import Button from '../../primitives/Button';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import List from '../../../components/primitives/List';


interface ICostAddEditPopupProps {
    onPressCancel: () => void,
    onPressSave: (cost: { vatRate: number, amount: number, name: string }, file: any) => void,
}

const CostAddEditPopup = (props: ICostAddEditPopupProps) => {

    const { onPressCancel, onPressSave } = props;

    const [cost, setCost] = useState<{ vatRate: string, amount: string, name: string }>({
        amount: '',
        vatRate: '23',
        name: ''
    });
    const [file, setFile] = useState<DocumentPickerResponse>();

    const openFilePicker = () => {
        DocumentPicker.pick({
            type: [DocumentPicker.types.pdf]
        }).then(x => {
            setFile(x);
        }).catch(error => {
            if (!DocumentPicker.isCancel(error))
                throw error;
        })
    }

    const pressSave = useCallback(() => {
        onPressSave({
            amount: parseFloat(cost.amount),
            name: cost.name,
            vatRate: parseInt(cost.vatRate)
        }, file)
    }, [cost, file]);

    return (
        <Popup>
            <List>
                <Container marginHorizontal='small'>
                    <Container marginVertical='normal'>
                        <Label type='bold'>Nazwa:</Label>
                        <TextInput value={cost.name} onChangeText={value => { setCost({ ...cost, name: value }) }} />
                    </Container>
                    <Container marginVertical='normal'>
                        <Label type='bold'>Wartość:</Label>
                        <TextInput value={cost.amount} onChangeText={value => { setCost({ ...cost, amount: value }) }} />
                    </Container>
                    <Container>
                        <Label type='bold'>Stawka VAT:</Label>
                        <TextInput value={cost.vatRate} onChangeText={value => { setCost({ ...cost, vatRate: value }) }} />
                    </Container>
                    <Container>
                        <Label>{file ? file.name : ''}</Label>
                        <Button iconName='file-pdf' title='Wybierz plik' onPress={openFilePicker}></Button>
                    </Container>
                </Container>
            </List>
            <Container moveToBottom flexDirection='row'>
                <Container><Button iconName='window-close' title='Anuluj' onPress={onPressCancel}></Button></Container>
                <Container><Button iconName='save' title='Zapisz' onPress={pressSave}></Button></Container>
            </Container>
        </Popup>
    )
}

export default memo(CostAddEditPopup);