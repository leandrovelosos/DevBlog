import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from './pages/Home'
import CategoryPosts from './pages/CategoryPosts'
import Detail from './pages/Detail'
import Search from './pages/Search';

const Stack = createNativeStackNavigator();

function Routes() {
    return (
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
                title: 'Detalhes',
                headerTintColor: '#FFF',
                headerStyle:{
                    backgroundColor: '#232630'
                }
            }}
            />

            <Stack.Screen
            name="Category"
            component={CategoryPosts}
            options={{
                headerTintColor: '#FFF',
                headerStyle:{
                    backgroundColor: '#232630'
                }
            }}
            />

            <Stack.Screen
            name="Search"
            component={Search}
            options={{
                title: "Procurando algo?",
                headerTintColor: '#FFFF',
                headerStyle:{
                    backgroundColor: '#232630'
                }
            }}
            />
        </Stack.Navigator >
            
    )
}

export default Routes;