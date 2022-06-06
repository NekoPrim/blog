import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Context as BlogContext } from '../context/BlogContext';

const IndexScreen = ({ navigation }) => {


    const { state, addBlogPost, deleteBlogPost } = useContext(BlogContext);

    return (
        <View>
            <Button
                title="Add Post"
                onPress={addBlogPost}
            />
            <FlatList
                data={state}
                keyExtractor={(blogPost) => blogPost.title}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
                            <View style={styles.rowStyle}>

                                <Text style={styles.titleStyle}>
                                    {item.title} - {item.id}
                                </Text>

                                <TouchableOpacity
                                    onPress={() => deleteBlogPost(item.id)}
                                >
                                    <Feather
                                        name="trash"
                                        style={styles.iconStyle}
                                    />
                                </TouchableOpacity>

                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <Feather name="plus" size={30} />
            </TouchableOpacity>
        ),
    };
};

const styles = StyleSheet.create({
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: 'grey',
        paddingHorizontal: 10,
    },
    titleStyle: {
        fontSize: 18,
    },
    iconStyle: {
        fontSize: 24,
    }
});

export default IndexScreen;