import React, { useState, memo, useCallback } from 'react';
import Button from '../../primitives/Button';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { GetById, Update, Delete } from '../../../actions/BuildingAction';
import { Add } from '../../../actions/PartAction';
import List from '../../primitives/List';
import { BuildingDetail } from '../../../models/BuildingDetail';
import ListItem from '../../primitives/ListItem';
import Container from '../../primitives/Container';
import Label from '../../primitives/Label';
import BuildingAddEditPopup from './AddEditPopup';
import PartAddEditPopup from '../part/AddEditPopup';
import Icon from 'react-native-vector-icons/FontAwesome';

const BuildingView = () => {

    const route = useRoute();

    const [params] = useState<{ id: string }>(route.params as { id: string });

    const [building, setBuilding] = useState<BuildingDetail>();

    const [isBuildingEditPopupVisible, setBuildingIsEditPopupVisible] = useState<boolean>(false);

    const [isPartAddPopupVisible, setIsPartAddPopupVisible] = useState<boolean>(false);

    const { navigate, setOptions } = useNavigation();

    useFocusEffect(
        useCallback(() => {
            GetById(params.id)
                .then(data => {
                    setBuilding(data);
                    setOptions({ title: data?.name });
                }).catch(() => { navigate('Error') });

        }, [params])
    );

    const editBuilding = useCallback((name: string) => {
        Update(params.id, { name })
            .then(isSuccess => {
                if (isSuccess) {
                    GetById(params.id)
                        .then(building => {
                            setBuilding(building);
                            setBuildingIsEditPopupVisible(false);
                            setOptions({ title: building?.name });
                        }).catch(() => { navigate('Error') });
                }
            }).catch(() => { navigate('Error') });

    }, [params]);

    const removeBuilding = useCallback(() => {
        Delete(params.id).then(isSuccess => {
            if (isSuccess) {
                navigate('Home');
            }
        }).catch(() => { navigate('Error') });

    }, [params]);

    const addPart = useCallback((part: { name: string, startDate: string, endDate: string, budget: number }) => {
        Add(params.id, part).then(isSuccess => {
            if (isSuccess) {
                GetById(params.id).then(building => {
                    setBuilding(building);
                    setIsPartAddPopupVisible(false)
                }).catch(() => { navigate('Error') });
            }
        }).catch(() => { navigate('Error') });

    }, [params])

    const openAddPartPopup = useCallback(() => { setIsPartAddPopupVisible(true) }, []);

    const closeAddPartPopup = useCallback(() => { setIsPartAddPopupVisible(false) }, []);

    const openEditBuildingPopup = useCallback(() => { setBuildingIsEditPopupVisible(true) }, []);

    const closeEditBuildingPopup = useCallback(() => { setBuildingIsEditPopupVisible(false) }, []);

    const openPart = useCallback((partId: string) => {
        navigate('Part', { buildingId: params.id, id: partId });
    }, [params]);

    return (
        <>
            <Container adjustContent marginHorizontal='small'>
                <Container adjustContent>
                    <Container adjustContent marginVertical='small' >
                        <Label type='grayout'>
                            {'Nazwa budowy:'}
                        </Label>
                        <Label type='bold'>
                            {building?.name}
                        </Label>
                    </Container>
                    <Container adjustContent marginVertical='small'>
                        <Label type='grayout'>
                            {'Data rozpoczęcia:'}
                        </Label>
                        <Label type='bold'>
                            {building && building.startDate ? new Date(building.startDate).toLocaleDateString() : '-'}
                        </Label>
                    </Container>
                    <Container adjustContent >
                        <Label type='grayout'>
                            {'Data zakończenia:'}
                        </Label>
                        <Label type='bold'>
                            {building && building.endDate ? new Date(building.endDate).toLocaleDateString() : '-'}
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
                    <Container adjustContent flexDirection='row' justifyContent='space-between'>
                        <Label type='bold'>
                            {building?.totalBudget?.toFixed(2) ?? "-"}
                        </Label>
                        <Label type='bold'>
                            {building?.totalBudgetReserve?.toFixed(2) ?? "-"}
                        </Label>
                    </Container>
                </Container>
            </Container>
            <Container>
                <List>
                    {building && building.parts.map(part =>
                        <ListItem id={part.id} key={part.id} onPress={openPart}>
                            <Container>
                                <Container flexDirection='row'>
                                    <Container>
                                        <Container marginVertical='small'>
                                            <Label type='grayout'>
                                                {'Nazwa:'}
                                            </Label>
                                            <Label type='bold'>
                                                {part.name}
                                            </Label>
                                        </Container>
                                        <Container marginVertical='small'>
                                            <Label type='grayout'>
                                                {'Data rozpoczęcia:'}
                                            </Label>
                                            <Label type='bold'>
                                                {part.startDate && new Date(part.startDate).toLocaleDateString()}
                                            </Label>
                                        </Container>
                                        <Container marginVertical='small'>
                                            <Label type='grayout'>
                                                {'Data zakończenia:'}
                                            </Label>
                                            <Label type='bold'>
                                                {part.endDate && new Date(part.endDate).toLocaleDateString()}
                                            </Label>
                                        </Container>
                                        <Container marginVertical='small'>
                                            <Label type='grayout'>
                                                {'Suma kosztów:'}
                                            </Label>
                                            <Label type='bold'>
                                                {part?.totalCost}
                                            </Label>
                                        </Container>
                                    </Container>
                                    <Container adjustContent>
                                        <Icon name='puzzle-piece' size={50}></Icon>
                                    </Container>
                                </Container>
                                <Container marginVertical='small'>
                                    <Container flexDirection='row' justifyContent='space-between'>
                                        <Label type='grayout'>
                                            {'Budżet:'}
                                        </Label>
                                        <Label type='grayout'>
                                            {'Pozostało:'}
                                        </Label>
                                    </Container>
                                    <Container flexDirection='row' justifyContent='space-between' >
                                        <Label type='bold'>
                                            {part.budget?.toFixed(2)}
                                        </Label>
                                        <Label type='bold'>
                                            {part.budgetReserve?.toFixed(2)}
                                        </Label>
                                    </Container>
                                </Container>
                            </Container>
                        </ListItem>)}
                </List>
            </Container>
            {
                isPartAddPopupVisible && <PartAddEditPopup
                    onPressCancel={closeAddPartPopup}
                    onPressSave={addPart}
                />
            }
            {
                isBuildingEditPopupVisible && <BuildingAddEditPopup
                    name={building?.name}
                    onPressCancel={closeEditBuildingPopup}
                    onPressSave={editBuilding}
                />
            }
            <Container moveToBottom flexDirection='row'>
                <Container >
                    <Button disabled={isPartAddPopupVisible || isBuildingEditPopupVisible} iconName='plus-square' title='Dodaj etap' onPress={openAddPartPopup} />
                </Container>
                <Container >
                    <Button disabled={isPartAddPopupVisible || isBuildingEditPopupVisible} iconName='edit' title='Edytuj' onPress={openEditBuildingPopup} />
                </Container>
                <Container>
                    <Button disabled={isPartAddPopupVisible || isBuildingEditPopupVisible} iconName='trash' title='Usuń' onPress={removeBuilding} />
                </Container>
            </Container>
        </>
    );
}

export default memo(BuildingView);