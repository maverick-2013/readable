import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatDate} from '../../utils/Utils'
import {Link} from 'react-router-dom'
import * as actions from '../../actions/actions'
import ThumbsUp from '../../images/thumbs-up.png'
import ThumbsDown from '../../images/thumbs-down.png'

class CommentInfoForm extends Component {

    onCommentDelete = (comment) => {
        let parentId = comment.parentId;
        this.props.deleteComment(comment.id, () => {
            this.props.history.push(`/post/${parentId}`);
            this.props.getPostComments(comment.parentId)
        })
    };

    render() {
        return (
            <div>
                {this.props.comments.map(comment => (
                    <div className="comment" key={comment.id}>
                        <div>
                            <p>{comment.body}</p>
                            <div className="comment-author">
                                <p> by <b>{comment.author}</b> at {formatDate(comment.timestamp)}</p></div>
                            <div className="votes">
                                <img src={ThumbsUp} width="32" height="32" onClick={() => {
                                    this.props.voteComment(comment.id, comment.parentId, "upVote")
                                }}/>
                                <img src={ThumbsDown} width="32" height="32" onClick={() => {
                                    this.props.voteComment(comment.id, comment.parentId, "downVote")
                                }}/>
                                {comment.voteScore} votes
                            </div>
                        </div>
                        <div className="button-action">
                            <Link to={`/${this.props.category}/${comment.parentId}/${comment.id}/edit`}>
                                <button>Edit</button>
                            </Link>
                            <button onClick={() => this.onCommentDelete(comment)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

function mapStateToProps({posts}) {
    return {posts}
}

export default connect(mapStateToProps, actions)(CommentInfoForm)
