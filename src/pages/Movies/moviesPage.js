import React ,{ useEffect , useState }from 'react';
import Header from '../../components/Header/headerComp';
import { getMoviesSave, deleteMovie,key } from '../../utils/storage';
import FavoriteItem from '../../components/FavoriteItem/favoriteComp';
import { Container, ListMovies } from './style';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Movies = () =>{

    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        let isActive = true;

        async function getFavoriteMovies(){
            const result = await getMoviesSave(key);
            if(isActive){
                setMovies(result);
            }
        }

        if(isActive){
            getFavoriteMovies();
        }

        return () => {
            isActive = false;
        }

    }, [isFocused]);

    async function handleDelete(id){
        const result = await deleteMovie(id);
        setMovies(result);
    }

    async function navigationDetailPage(item){
        navigation.navigate("Detail", {id: item.id});
    }

    return(
        <Container>
            <Header  title="Meus Filmes"/>
            <ListMovies 
                showsVerticalScrollIndicator={false}
                data={movies}
                keyExtractor={(item, index) => index.toString()}
                renderItem={ ({item}) => (
                    <FavoriteItem 
                        data={item} 
                        deleteMovie={handleDelete}
                        navigatePage={() => navigationDetailPage(item)}
                    />
                )}
            />
        </Container>
    )
}

export default Movies;