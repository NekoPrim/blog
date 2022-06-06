import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

const BlogPostForm = ({ onSubmit, initialValues }) => {
    const [ title, setTitle ] = useState(initialValues.title);
    const [ content, setContent ] = useState(initialValues.content);

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
                title="Save Blog Post"
                onPress={() => onSubmit(title, content)}
            />
        </View>
    );
};

// react automatically checks for this
BlogPostForm.defaultProps = {
    initialValues: {
        title: '',
        content: ''
    }
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

export default BlogPostForm;