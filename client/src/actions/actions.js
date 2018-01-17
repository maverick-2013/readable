import * as API from '../utils/API'
import * as Types from './constants.js';

export const fetchCategories = () => {
    return (dispatch) => {
        API.fetchCategories().then(res => {
            dispatch({type: Types.GET_CATEGORY, res})
        })
    }
};

export const fetchPosts = () => {
    return (dispatch) => {
        API.fetchPosts().then(posts => {
            dispatch({type: Types.GET_POSTS, posts})
        })
    }
};


export const addPost = (post, callback) => {
    return (dispatch) => {
        API.addPost(post).then(() => callback());
        dispatch({type: Types.ADD_POST, post})
    }
};

export const updatePost = (postId, title, body, callback) => {
    return (dispatch) => {
        API.updatePost(postId, title, body).then(updatedPost => {
            dispatch({type: Types.UPDATE_POST, updatedPost, postId})
        }).then(() => callback())
    }
};

export const deletePost = (postId, callback) => {
    return dispatch => {
        API.deletePost(postId).then(() => callback());
        dispatch({type: Types.DELETE_POST, postId})
    }
};

export const votePost = (postId, option) => {
    return (dispatch) => {
        API.votePost(postId, option).then(() => {
            dispatch({type: Types.VOTE_POST, postId, option})
        })
    }
};

export const sortPost = (sortKey) => {
    return dispatch => {
        dispatch({type: Types.SORT_POST, sortKey})
    }
};

export const getPostComments = (parentId) => {
    return (dispatch) => {
        API.fetchComment(parentId).then(comments => {
            dispatch({type: Types.GET_COMMENTS, parentId, comments})
        })
    }
};

export const addComment = (comment, parentId, callback) => {
    return (dispatch) => {
        API.addComment(comment).then(comment => {
            dispatch({type: Types.ADD_COMMENT, parentId, comment})
        }).then(() => callback())
    }
};

export const deleteComment = (commentId, callback) => {
    return (dispatch) => {
        API.deleteComment(commentId).then(() => callback());
        dispatch({type: Types.DELETE_COMMENT, commentId})
    }
};

export const voteComment = (commentId, parentId, option) => {
    return (dispatch) => {
        API.voteComment(commentId, option).then(updatedComment => {
            dispatch({type: Types.VOTE_COMMENT, updatedComment, commentId, parentId})
        })
    }
};

export const updateComment = (commentId, parentId, timestamp, body, callback) => {
    return (dispatch) => {
        API.updateComment(commentId, timestamp, body)
            .then(updatedComment => {
                dispatch({type: Types.UPDATE_COMMENT, updatedComment, commentId, parentId})
            }).then(() => callback())
    }
};

