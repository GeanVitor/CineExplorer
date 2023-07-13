import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Text } from 'react-native';
import { Container, MenuButton, Title } from './styles';
import { useNavigation } from '@react-navigation/native';

function Header({title}) {
  const navigation = useNavigation();
  
  return (
    <Container>
      <MenuButton onPress={() => navigation.openDrawer()}>
        <Feather name="menu" size={36} color="#FFF"/>
      </MenuButton>
      <Title>
        <Text>{title}</Text>
      </Title>
    </Container>
  );
}

export default Header;
