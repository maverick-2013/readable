import React, {Component} from 'react';
import {connect} from 'react-redux'
import {addComment} from '../../actions/actions'
import {guid} from '../../utils/Utils'

class NewCommentForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        const postId = this.props.match.params.postId;
        const commendBody = e.target.body.value;
        const author = e.target.author.value;
        if (!commendBody.length || !author.length) {
            alert("Fill all required fields");
        } else {
            const submitComment = {
                id: guid(),
                parentId: postId,
                timestamp: Date.now(),
                body: commendBody,
                author: author
            };
            this.props.addComment(submitComment, postId,
                () => this.props.history.push(`/post/${postId}`))
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <ul className="form-ul">
                    <li>
                        <label>Username <span className="required">*</span></label>
                        <input type="text" name="author" className="field-long"/>
                    </li>
                    <li>
                        <label>Comment <span className="required">*</span></label>
                        <textarea name="body" id="field5" className="field-long field-textarea"></textarea>
                    </li>
                    <button>Submit</button>
                </ul>
            </form>
        )
    }
}

function mapStateToProps({posts}) {
    console.log("state", this.state);
    return {
        posts: posts,
    }
}

export default connect(mapStateToProps, {addComment})(NewCommentForm)
