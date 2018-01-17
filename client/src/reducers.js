import {combineReducers} from 'redux'

import sortBy from 'sort-by'
import * as Types from "./actions/constants";


function posts(state = [], action) {
    const {posts, post, postId, updatedPost, sortKey} = action;
    switch (action.type) {
        case Types.GET_POSTS:
            return action.posts.filter(post => !(post.deleted));
        case Types.GET_CATEGORY_POSTS:
            return posts.filter(post => !(post.deleted));
        case Types.ADD_POST:
            return state.concat([post]);
        case Types.UPDATE_POST:
            return state.map(post => {
                if (post.id === postId) {
                    post = updatedPost
                }
                return post
            });
        case Types.DELETE_POST:
            return state.filter(post => post.id !== postId);
        case Types.VOTE_POST:
            return state.map(post => {
                if (post.id === action.postId) {
                    if (action.option === "upVote") {
                        post.votesScore += 1
                    }
                    if (action.option === "downVote") {
                        post.votesScore -= 1
                    }
                }
                return post
            });
        case Types.SORT_POST:
            return [].concat(state.sort(sortBy("-" + sortKey)));
        default:
            return state
    }
}

function categories(state = [], action) {
    switch (action.type) {
        case Types.GET_CATEGORY:
            return action.res.categories;

        default:
            return state
    }
}

function comments(state = {}, action) {
    const {comments, commentId, parentId, updatedComment} = action;
    switch (action.type) {
        case Types.GET_COMMENTS:
            return Object.assign({}, state, {[parentId]: comments});
        case Types.VOTE_COMMENT:
            return {
                ...state,
                [parentId]: state[parentId].map(comment => {
                    if (comment.id === commentId) {
                        comment = updatedComment
                    }
                    return comment
                })
            };
        case Types.UPDATE_COMMENT:
            return {
                ...state,
                [parentId]: state[parentId].map(comment => {
                    if (comment.id === commentId) {
                        comment = updatedComment
                    }
                    return comment
                })
            };
        case Types.ADD_COMMENT:
            return Object.assign({}, state, {[parentId]: comments});
        case Types.DELETE_COMMENT:
            return state;
        default:
            return state
    }
}

export default combineReducers({
    posts,
    categories,
    comments
})