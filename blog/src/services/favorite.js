import AsyncStorage from "@react-native-async-storage/async-storage";
import api from './api';

// buscar categoria favoritada
export async function getFavorite(){
    const data = await AsyncStorage.getItem('@favCategory')

    if(data !== null){
        const response = await api.get(`api/categories/${data}?fileds=name&populate=posts,posts.cover`)
      
        //a propriedade "?" retorna null em caso de valores não encontrados
        //com ? a aplicacao nao crasha

        return response.data?.data?.attributes?.posts?.data
    }else{
        return [];
    }
}

//favoritar uma categoria
export async function setFavorite(category){
    await AsyncStorage.setItem('@favCategory', String(category))

    const response = await getFavorite();
    return response;
}