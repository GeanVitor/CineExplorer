import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home/homePage';
import Detail from '../pages/Detail/detailPage';
import Search from '../pages/Search/searchPage';

const Stack = createNativeStackNavigator();

function StackRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={Home}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Detail"
                component={Detail}
                options={{
                    headerShown: false,
                    title: "Detalhes"
                }}
             />
            <Stack.Screen 
                name="Search"
                component={Search}
                options={{
                    title: "Sua busca",
                    headerTintColor: "#FFF",
                    headerTitleStyle: {
                        color: "#FFF"
                    },
                    headerStyle: {
                        backgroundColor: "#0E0C13"
                    }
                }} 
            />
        </Stack.Navigator>
    )
}

export default StackRoutes;