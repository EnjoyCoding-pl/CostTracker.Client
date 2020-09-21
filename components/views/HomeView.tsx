import React, { useState, useCallback, memo } from 'react';
import Button from '../../components/primitives/Button';
import { Building } from '../../models/Building';
import { GetAll, Add } from '../../actions/BuildingAction';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import List from '../primitives/List';
import ListItem from '../primitives/ListItem';
import Container from '../../components/primitives/Container';
import Label from '../../components/primitives/Label';
import BuildingAddEditPopup from './building/AddEditPopup';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeView = () => {

    const [buildings, setBuildings] = useState<Building[]>();

    const [isAddPopupVisible, setIsAddPopupVisible] = useState<boolean>(false);

    const { navigate } = useNavigation();

    useFocusEffect(
        useCallback(() => {
            GetAll()
                .then(buildings => setBuildings(buildings))
                .catch(() => { navigate('Error') });
        }, [])
    );

    const addBuilding = useCallback((name: string) => {
        Add({ name })
            .then(isSuccess => {
                if (isSuccess) {
                    GetAll()
                        .then(buildings => {
                            setBuildings(buildings);
                            setIsAddPopupVisible(false);
                        }).catch(() => { navigate('Error') });

                }
            }).catch(() => { navigate('Error') });
    }, []);

    const openAddPopup = useCallback(() => { setIsAddPopupVisible(true) }, []);

    const closeAddPopup = useCallback(() => { setIsAddPopupVisible(false) }, []);

    const openBuilding = useCallback((id) => { navigate('Building', { id }); }, []);

    return (
        <>
            <List>
                {
                    buildings && buildings.map(building =>
                        <ListItem id={building.id} onPress={openBuilding} key={building.id}>
                            <Container marginHorizontal='small'>
                                <Container flexDirection='row' justifyContent='space-between'>
                                    <Container>
                                        <Container marginVertical='small' >
                                            <Label type='grayout'>
                                                {'Nazwa budowy:'}
                                            </Label>
                                            <Label type='bold'>
                                                {building.name}
                                            </Label>
                                        </Container>
                                        <Container marginVertical='small'>
                                            <Label type='grayout'>
                                                {'Data rozpoczęcia:'}
                                            </Label>
                                            <Label type='bold'>
                                                {building.startDate ? new Date(building.startDate).toLocaleDateString() : '-'}
                                            </Label>
                                        </Container>
                                        <Container marginVertical='small'>
                                            <Label type='grayout'>
                                                {'Data zakończenia:'}
                                            </Label>
                                            <Label type='bold'>
                                                {building.endDate ? new Date(building.endDate).toLocaleDateString() : '-'}
                                            </Label>
                                        </Container>
                                    </Container>
                                    <Container adjustContent>
                                        <Icon name="building" size={50}></Icon>
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
                                    <Container flexDirection='row' justifyContent='space-between'>
                                        <Label type='bold'>
                                            {building.totalBudget?.toFixed(2) ?? "-"}
                                        </Label>
                                        <Label type='bold'>
                                            {building.totalBudgetReserve?.toFixed(2) ?? "-"}
                                        </Label>
                                    </Container>
                                </Container>
                            </Container>
                        </ListItem>)
                }
            </List>
            {isAddPopupVisible && <BuildingAddEditPopup
                onPressCancel={closeAddPopup}
                onPressSave={addBuilding}
            />}
            <Container moveToBottom>
                <Button iconName='plus-square' disabled={isAddPopupVisible} title='Dodaj budowę' onPress={openAddPopup}></Button>
            </Container>
        </>);
}

export default memo(HomeView);
