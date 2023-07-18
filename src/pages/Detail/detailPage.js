import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import Stars from 'react-native-stars';
import Genres from '../../components/Genres/genresComp';
import ModalLink from '../../components/ModalLink/modalComp';
import { ScrollView, Modal } from 'react-native';
import { saveMovie, hasMovie, deleteMovie } from '../../utils/storage';
import {
  Container,
  Header,
  HeaderButton,
  Banner,
  ButtonLink,
  Title,
  ContentArea,
  Rate,
  ListGenres,
  Description
} from './style';

import { Feather, Ionicons } from '@expo/vector-icons';

function Detail() {
  const isWeb = typeof window !== 'undefined';
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({});
  const [openLink, setOpenLink] = useState(false);
  const [isFavoriteMovie, setFavoriteMovie] = useState(false);

  useEffect(() => {
    let isActive = true;
    async function getMovie() {
      const response = await api.get(`https://api.themoviedb.org/3/movie/${route.params?.id}`, {
        params: {
          api_key: '5c80d453e79e7d5e565f04a910c09b13',
          language: 'pt-BR',
        }
      }).catch((error) => {
        console.log("A requisição falhou: " + error);
      });
      if (isActive) {
        setMovie(response.data);
        const isFavorite = await hasMovie(response.data);
        setFavoriteMovie(isFavorite);
      }
    }
    if (isActive) {
      getMovie();
    }

    return () => {
      isActive = false;
    }
  }, []);

  async function handleFavoriteMovie(movie) {
    if (isFavoriteMovie) {
      await deleteMovie(movie.id);
      setFavoriteMovie(false);
    } else {
      await saveMovie('save', movie);
      setFavoriteMovie(true);
    }
  }
    return (
      <Container>
        <Header>
          <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
            <Feather
              name='arrow-left'
              size={28}
              color="#FFF"
            />
          </HeaderButton>

          <HeaderButton activeOpacity={0.7} onPress={() => handleFavoriteMovie(movie)}>
            {isFavoriteMovie ? (
              <Feather
                name='save  '
                size={28}
                color="#FFF"
              />
            ) : (
              <Feather
                name="bookmark"
                size={28}
                color="#FFF"
              />
            )}
          </HeaderButton>
        </Header>
        <Banner
          source={{ uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }}
          resizeMethod='resize'
        />
        <ButtonLink onPress={() => setOpenLink(true)}>
          <Feather name="link" size={24} color="#FFF" />
        </ButtonLink>
        <Title numberOfLines={2}>{movie.title}</Title>
        <ContentArea>
          <Stars
            default={movie.vote_average}
            count={10}
            half={true}
            starSize={20}
            fullStar={<Ionicons name="md-star" size={24} color="#E7A74E" />}
            emptyStar={<Ionicons name="md-star-outline" size={24} color="#E7A74E" />}
            halfStar={<Ionicons name="md-star-half" size={24} color="#E7A74E" />}
            disable={true}
          />
          <Rate>{movie.vote_average}/10</Rate>
        </ContentArea>
        <ListGenres
          data={movie?.genres}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Genres data={item} />}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Title>Descrição</Title>
          <Description>{movie?.overview}</Description>
        </ScrollView>
        <Modal animationType='slide' transparent={true} visible={openLink}>
          <ModalLink
            link={movie.homepage}
            title={movie.title}
            closeModal={() => setOpenLink(false)}
          />
        </Modal>
      </Container>
    );
  }

export default Detail;