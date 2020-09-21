import React, { useState, memo, useCallback } from 'react';
import Button from '../../primitives/Button';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { GetById, Delete, Update } from '../../../actions/PartAction';
import List from '../../primitives/List';
import ListItem from '../../primitives/ListItem';
import Container from '../../primitives/Container';
import Label from '../../primitives/Label';
import { PartDetail } from '../../../models/PartDetail';
import PartAddEditPopup from './AddEditPopup';
import CostAddEditPopup from '../cost/AddEditPopup';
import { Add, DownloadInvoice } from '../../../actions/CostAction';
import Icon from 'react-native-vector-icons/FontAwesome5';

const PartView = () => {

    const route = useRoute();

    const [params] = useState(route.params as { buildingId: string, id: string });

    const [part, setPart] = useState<PartDetail>();

    const { navigate, setOptions } = useNavigation();

    const [isPartEditPopupVisible, setIsPartEditPopupVisible] = useState(false);

    const [isCostAddPopupVisible, setIsCostAddPopupVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {
            GetById(params.buildingId, params.id)
                .then(p => {
                    setPart(p);
                    setOptions({ title: p.name })
                })
                .catch(() => { navigate('Error') });
        }, [params]));

    const removePart = useCallback(() => {
        Delete(params.buildingId, params.id)
            .then(isSuccess => {
                if (isSuccess) {
                    navigate('Building', { id: params.buildingId })
                }
            }).catch(() => { navigate('Error') });

    }, [params])

    const editPart = useCallback((part: { name: string, startDate: string, endDate: string, budget: number }) => {
        Update(params.buildingId, params.id, part)
            .then(isSuccess => {
                if (isSuccess) {
                    GetById(params.buildingId, params.id)
                        .then(p => {
                            setPart(p);
                            setOptions({ title: p.name });
                            setIsPartEditPopupVisible(false);
                        }).catch(() => { navigate('Error') });
                }
            }).catch(() => { navigate('Error') });

    }, [params]);

    const addCost = useCallback((cost: { vatRate: number, amount: number, name: string }, file: any) => {
        Add(params.id, cost, file)
            .then(isSuccess => {
                if (isSuccess) {
                    setIsCostAddPopupVisible(false);
                    GetById(params.buildingId, params.id)
                        .then(resp => {
                            setPart(resp)
                        }).catch(() => { navigate('Error') });
                }
            }).catch(() => { navigate('Error') });

    }, [params])

    const openEditPartPopup = useCallback(() => { setIsPartEditPopupVisible(true) }, []);

    const closeEditPartPopup = useCallback(() => { setIsPartEditPopupVisible(false) }, []);

    const openAddCostPopup = useCallback(() => { setIsCostAddPopupVisible(true) }, []);

    const closeAddCostPopup = useCallback(() => { setIsCostAddPopupVisible(false) }, []);

    return (
        <Container>
            <Container adjustContent marginHorizontal='small'>
                <Container adjustContent flexDirection='column'>
                    <Container adjustContent marginVertical='small'>
                        <Label type='grayout'>
                            {'Nazwa:'}
                        </Label>
                        <Label type='bold'>
                            {part?.name}
                        </Label>
                    </Container>
                    <Container adjustContent marginVertical='small'>
                        <Label type='grayout'>
                            {'Data rozpoczęcia:'}
                        </Label>
                        <Label type='bold'>
                            {part && part.startDate && new Date(part.startDate).toLocaleDateString()}
                        </Label>
                    </Container>
                    <Container adjustContent marginVertical='small'>
                        <Label type='grayout'>
                            {'Data zakończenia:'}
                        </Label>
                        <Label type='bold'>
                            {part && part.endDate && new Date(part.endDate).toLocaleDateString()}
                        </Label>
                    </Container>
                    <Container adjustContent marginVertical='small'>
                        <Label type='grayout'>
                            {'Suma kosztów:'}
                        </Label>
                        <Label type='bold'>
                            {part?.totalCost}
                        </Label>
                    </Container>
                </Container>
                <Container adjustContent marginVertical='small'>
                    <Container adjustContent flexDirection='row' justifyContent='space-between'>
                        <Label type='grayout'>
                            {'Budżet:'}
                        </Label>
                        <Label type='grayout'>
                            {'Pozostało:'}
                        </Label>
                    </Container>
                    <Container adjustContent flexDirection='row' justifyContent='space-between' >
                        <Label type='bold'>
                            {part?.budget.toFixed(2)}
                        </Label>
                        <Label type='bold'>
                            {part?.budgetReserve?.toFixed(2)}
                        </Label>
                    </Container>
                </Container>
            </Container>
            <List>
                {part && part?.costs.map(cost =>
                    <ListItem id={cost.invoiceUrl} key={cost.id} onPress={DownloadInvoice}>
                        <Container flexDirection='row' marginHorizontal='small'>
                            <Container  >
                                <Container marginVertical='small'>
                                    <Label type='grayout'>
                                        {'Nazwa:'}
                                    </Label>
                                    <Label type='bold'>
                                        {cost.name}
                                    </Label>
                                </Container>
                                <Container marginVertical='small'>
                                    <Label type='grayout'>
                                        {'Wartość:'}
                                    </Label>
                                    <Label type='bold'>
                                        {cost.amount.toFixed(2)}{` (${cost.vatRate}% vat)`}
                                    </Label>
                                </Container>
                            </Container>
                            <Container adjustContent flexDirection='row'>
                                <Icon name='wallet' size={45} ></Icon>
                                <Icon name={cost.isRefund ? 'arrow-down' : 'arrow-up'} size={15} ></Icon>
                            </Container>
                        </Container>
                    </ListItem>)}
            </List>
            {isPartEditPopupVisible && <PartAddEditPopup
                onPressCancel={closeEditPartPopup}
                onPressSave={editPart}
                part={part}
            />}
            {isCostAddPopupVisible && <CostAddEditPopup
                onPressCancel={closeAddCostPopup}
                onPressSave={addCost}
            />}
            <Container moveToBottom flexDirection='row'>
                <Container>
                    <Button iconName='plus-square' disabled={isPartEditPopupVisible || isCostAddPopupVisible} onPress={openAddCostPopup} title='Dodaj koszt' />
                </Container>
                <Container>
                    <Button iconName='edit' disabled={isPartEditPopupVisible || isCostAddPopupVisible} onPress={openEditPartPopup} title='Edytuj' />
                </Container>
                <Container>
                    <Button iconName='trash' disabled={isPartEditPopupVisible || isCostAddPopupVisible} onPress={removePart} title='Usuń' />
                </Container>
            </Container>
        </Container>
    );
}

export default memo(PartView);