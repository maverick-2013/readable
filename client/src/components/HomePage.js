import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PostItem from './post/PostItem'
import {connect} from 'react-redux'
import * as actions from '../actions/actions';

class HomePage extends Component {
    static propTypes = {
        posts: PropTypes.array
    };

    componentDidMount() {
        this.props.fetchPosts()
    }

    render() {
        const {posts} = this.props;
        return <div>
            {posts.map(post => (
                <PostItem key={post.id} post={post}/>
            ))}
        </div>
    }
}

function mapStateToProps({posts}, {match}) {
    const category = match.params.category;
    return {
        posts: category ? posts.filter(post => post.category === category) : posts
    }
}

export default connect(mapStateToProps, actions)(HomePage)
