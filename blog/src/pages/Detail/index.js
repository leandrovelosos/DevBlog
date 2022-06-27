import React, { useEffect, useState, useLayoutEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../../services/api'
import { Feather } from '@expo/vector-icons'

export default function Detail() {
    const route = useRoute();
    const navigation = useNavigation();

    const [post, setPost] = useState({})
    const [links, setLinks] = useState([])

    useEffect(() => {
        async function getPost() {
            const response = await api.get(`api/posts/${route.params?.id}?populate=cover,category,Opcoes`)
            setPost(response.data.data)
            setLinks(response.data?.data?.attributes?.Opcoes)

        }

        getPost();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image
                resizeMode='cover'
                style={styles.cover}
                source={{ uri: `http://10.211.113.250:1337${post?.attributes?.cover?.data?.attributes?.url}` }}
            />

            {/*fora da scrollview desta forma o titulo fica fixo*/}

            <Text style={styles.title}>
                {post?.attributes?.title}
            </Text>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

                <Text style={styles.description}>
                    {post?.attributes?.description}
                </Text>

                {links.length > 0 && (
                    <Text style={styles.subTitle}>
                        Links
                    </Text>
                )}

                {links.map(link => (
                    <TouchableOpacity
                        key={link.id}
                        style={styles.linkButton}>

                        <Feather name="link" color="#1e4687" size={14} />
                        <Text style={styles.linkText}>
                            {link.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'

    },
    cover: {
        width: '100%',
        height: 230,

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 14,
        marginTop: 18,
        paddingHorizontal: 12,
    },
    content: {
        paddingHorizontal: 12,
    },
    description: {
        lineHeight: 20,
        textAlign: "justify",

    },
    subTitle: {
        fontWeight: 'bold',
        marginTop: 14,
        fontSize: 18,
        marginBottom: 6,

    },
    linkButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    linkText: {
        color: '#1e4687',
        fontSize: 16,
        marginLeft: 6,
    }
})
