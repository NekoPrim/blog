import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = ( state, action ) => {
    switch( action.type ) {
        case 'get_blogPosts':
            return action.payload;
        // case 'add_blogPost':
        //     return [
        //         ...state,
        //         { 
        //             id: Math.floor(Math.random() * 99999),
        //             title: action.payload.title,
        //             content: action.payload.content
        //         }
        //     ];
        case 'edit_blogPost':
            return state.map((blogPost) => {
                return (blogPost.id === action.payload.id) ?
                    action.payload
                    :
                    blogPost
            });
        case 'delete_blogPost':
            return state.filter((blogPost) => blogPost.id != action.payload);
        default:
            return state;
    }
};

const getBlogPosts = (dispatch) => {
    return async () => {
        const response = await jsonServer.get('/blogPosts');
        // response.data === [{}, {}, {}]

        dispatch({
            type: 'get_blogPosts',
            payload: response.data
        })
    };
};

// dont need dispatch anymore due to getBlogPosts
// const addBlogPost = (dispatch) => {
const addBlogPost = () => {
    return async (title, content, callback) => {
        await jsonServer.post('/blogPosts', { title, content});
        // dispatch({ type: 'add_blogPost', payload: { title, content } });
        if (callback) {
            callback();
        }
    };
};

const deleteBlogPost = (dispatch) => {
    return async (id) => {
        await jsonServer.delete(`/blogPosts/${id}`);

        // could use callback instead od dispatch
        // look at addBlogPost as example
        dispatch({ type: 'delete_blogPost', payload: id })
    };
};

const editBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogPosts/${id}`, { title, content });

        dispatch({ 
            type: 'edit_blogPost', 
            payload: { id, title, content }
        });
        if (callback) {
            callback();
        }
    };
};

export const { Context, Provider } = createDataContext( 
    blogReducer, 
    { getBlogPosts, addBlogPost, deleteBlogPost, editBlogPost },
    [
        // dummy blog posts
        // {
        // title: 'TEST POST',
        // content: 'TEST CONTENT',
        // id: 1
        // }
    ] 
);