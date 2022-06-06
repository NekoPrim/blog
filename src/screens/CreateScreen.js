import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';

const CreateScreen = ({ navigation }) => {
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    
    const { addBlogPost } = useContext(BlogContext);

    return(
        <View>
            <Text style={styles.label}>
                Enter Title:
            </Text>

            <TextInput 
                value={title}
                onChangeText={ (text) => setTitle(text) }
                style={styles.input}
            />

            <Text style={styles.label}>
                Enter Content:
            </Text>

            <TextInput 
                value={content}
                onChangeText={ (text) => setContent(text) }
                style={styles.input}
            />

            <Button 
                title="Add Blog Post"
                onPress={() => {
                    addBlogPost(title, content, () => {
                        // when title and content complete
                        // navigate to Index Screen
                        navigation.navigate('Index');
                    });
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 15,
        padding: 5,
        margin: 5,
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5,
    }
});

export default CreateScreen;