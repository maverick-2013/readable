import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, Route, Switch, withRouter} from 'react-router-dom'
import '../App.css';
import {connect} from 'react-redux'
import {fetchCategories, sortPost} from '../actions/actions'
import NewPostForm from './post/NewPostForm'
import NewCommentForm from './comment/NewCommentForm'
import EditCommentForm from './comment/EditCommentForm'
import EditPostForm from './post/EditPostForm'
import HomePage from './HomePage'
import PostDetailsForm from './post/PostDetailsForm'

class Index extends Component {
    static propTypes = {
        posts: PropTypes.array,
        categories: PropTypes.array
    };

    componentDidMount() {
        this.props.fetchCategories()
    }

    render() {
        const {categories, sortPost} = this.props;

        return (
            <div className="App">
                <div className="nav-header">
                    <Link className="home" to="/">
                        <button>Home</button>
                    </Link>
                    <Link className="new-post" to="/new">
                        <button>New Post</button>
                    </Link>
                </div>

                <div className="filters">
                    <div className="categories-container">
                        <p>Category</p>
                        {categories && categories.map(category => (
                            <Link key={category.name} to={`/${category.path}`}>
                                <button>{category.name}</button>
                            </Link>
                        ))}
                    </div>

                    <div className="sort-container">
                        <p>Order By</p>
                        <button onClick={() => sortPost("timestamp")}>Time</button>
                        <button onClick={() => sortPost("voteScore")}>Votes</button>
                    </div>
                </div>

                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/new" component={NewPostForm}/>
                    <Route exact path="/:category" component={HomePage}/>
                    <Route exact path="/:category/:postId" component={PostDetailsForm}/>
                    <Route path="/:category/:postId/edit" component={EditPostForm}/>
                    <Route path="/:category/:postId/comment" component={NewCommentForm}/>
                    <Route path="/:category/:postId/:commentId/edit" component={EditCommentForm}/>
                </Switch>

            </div>
        );
    }
}

function mapStateToProps({categories}) {
    return {
        categories: categories
    }
}

export default withRouter(connect(mapStateToProps, {
    sortPost,
    fetchCategories
})(Index))
