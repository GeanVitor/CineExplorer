import React, { useState, useEffect }from 'react';
import { Container, ListMovies } from './style';
import SearchItem from '../../components/SearchItem/searchComp';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

function Search(){

    const navigation = useNavigation();
    const route = useRoute();

    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        let isActive = true;

        async function getSearchMovie(){
            const response = await api.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    query: route?.params?.name,
                    api_key: '5c80d453e79e7d5e565f04a910c09b13',
                    language: 'pt-BR',
                    page: 1
                }
            })
            if(isActive){
                setMovie(response.data.results);
                setLoading(false);
            }
        }

        if(isActive){
            getSearchMovie();
        }
        
        return () => {
            isActive = false;
        }

    }, []);

    function navigateDetailsPage(item){
        navigation.navigate('Detail', {id: item.id})
    }

    if(loading){
        return(
            <Container></Container>
        )
    }

    return(
        <Container>
            <ListMovies 
                data={movie}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => <SearchItem data={item} navigatePage={() => navigateDetailsPage(item)}/>}
            />
        </Container>
    )
}

export default Search;