import React from 'react';
import { WebView } from 'react-native-webview';
import { Feather } from '@expo/vector-icons';
import { BackButton, Name } from './style';

function ModalLink({link, title, closeModal}){
    return(
        <>
            <BackButton onPress={closeModal} >
                <Feather name='x' size={35} color="#FFF" />
                <Name numberOfLines={1} >{title}</Name>
            </BackButton>
            <WebView source={{uri: link}} />
        </>
    )
}

export default ModalLink;