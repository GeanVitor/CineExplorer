import React from  'react';
import { 
    Container, 
    Title, 
    Rate, 
    RateContainer, 
    DetailButton, 
    DeleteButton, 
    ActionContainer 
} from './style';
import { Feather, Ionicons } from '@expo/vector-icons'

function FavoriteItem({data, deleteMovie, navigatePage}){
    return(
        <Container>
            <Title size={22}>{data.title}</Title>

            <RateContainer>
                <Ionicons name='md-star' size={12} color='#e7a74e' />
                <Rate>{data.vote_average}/10</Rate>
            </RateContainer>

            <ActionContainer>

                <DetailButton onPress={() => navigatePage(data)}>
                    <Title size={14}>Ver Detalhes</Title>
                </DetailButton>

                <DeleteButton onPress={() => deleteMovie(data.id)} >
                    <Feather name="trash" size={24} color="#fff" />
                </DeleteButton>

            </ActionContainer>
        </Container>
    )
}

export default FavoriteItem;