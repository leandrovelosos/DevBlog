import React, { useEffect, useState} from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from "react-native";

import {useNavigation} from '@react-navigation/native' 
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'
import CategoryItem from '../../components/CategoryItem'
import { getFavorite, setFavorite } from '../../services/favorite'
import FavoritePost from '../../components/FavoritePost'
import PostItem from '../../components/PostItem'

export default function Home(){

    const navigation = useNavigation();
    const [categories, setCategories] = useState([])
    const [favCategory, setFavCategory] = useState([])
    const [posts, setPosts] = useState([])
    
    useEffect(() => {


        async function loadData(){

            await getListPosts();

            const category = await api.get("/api/categories?populate=icon")
            setCategories(category.data.data)
        }

        loadData();
        
    }, [])

    useEffect(() => {
        async function favorite(){
            const response = await getFavorite()
            setFavCategory(response);
        }

        favorite();
    }, []) 

    //flat list vertical conteudos tela home
    async function getListPosts(){
        const response = await api.get("api/posts?populate=cover&sort=createdAt:desc")
        setPosts(response.data.data)
    }

    //favoritar uma categoria
    async function handleFavorite(id){
        const response = await setFavorite(id)


        //ao se favoritar uma categoria atraves do onlongpress surge um alerta 
        setFavCategory(response);
        //alert("Categoria Favoritada!")

    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.name}>DevBlog</Text>

                <TouchableOpacity onPress={() =>navigation.navigate("Search")}>
                    <Feather name="search" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={{paddingRight:12}}
            style={styles.categories}
            data={categories}
            keyExtractor={ (item) => String(item.id) }
            renderItem={ ({item }) => (
                <CategoryItem
                data={item} 
                favorite={ () => handleFavorite(item.id) }
                />
            ) }

            />

            <View style={styles.main}>

                {favCategory.length !== 0 && (
                    <FlatList
                    style={{
                        marginTop: 50, maxHeight: 100, paddingStart: 18, }}
                        contentContainerStyle={{ paddingEnd: 18, }}
                        data={favCategory}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={ (item) => String(item.id) }
                        renderItem={ ({ item }) => <FavoritePost data={item}/>}
                        />
                )}

                    {/* renderizacao condicional, quando uma categoria nao possui itens*/} 
                <Text style={[
                    styles.tittle,
                    { marginTop: favCategory.length > 0 ? 14 : 46}
                    ]}
                    >Conte??dos em alta</Text>

                    <FlatList
                    //mostra os posts na tela home
                    //propriedades
                    style={{flex: 1, padding: 18 }}
                    showsVerticalScrollIndicator={false}
                    data={posts}
                    keyExtractor={ (item) => String(item.id) }
                    renderItem={({item})=> <PostItem data={item} />}
                    />

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#232630'
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 18,
        marginTop: 18,
        marginBottom: 24
    },
    name:{
        fontSize: 28,
        color: '#FFF',
        fontWeight: 'bold'
    },
    categories:{
        maxHeight: 115,
        backgroundColor: '#EFEFEF',
        marginHorizontal: 18,
        borderRadius: 8,
        zIndex: 9
    },
    main:{
        backgroundColor: '#FFF',
        flex: 1,
        marginTop: -30,
        
    }, 
    tittle:{
        fontSize: 21,
        paddingHorizontal: 18,
        marginBottom: 14,
        fontWeight: 'bold',
        color: '#162123'
    }
})
