import React from 'react';
import { connect } from 'react-redux';
import { getPostOfComment } from '../../../redux/actions/comments';
import PostContent from '../content/index';
import selector from '../../../redux/selectors/index';
import _ from 'lodash';

class PostCell extends React.Component {
    state = {
        fid: this.props.fid
    }
    componentDidMount() {
        this.props.dispatch(getPostOfComment(this.props.fid));
    }
    componentWillReceiveProps(nextProps) {
        // console.log('!!!!!!!')
        // console.log(nextProps);
        if (nextProps.fid !== this.state.fid) {
            this.props.dispatch(getPostOfComment(nextProps.fid));
            this.setState({ fid: nextProps.fid })
        }
    }
    render() {
        const { postsOfComment, fid } = this.props;
        const post = _.find(postsOfComment.data, (list) => list.commentId === fid);
        const message = post && post.postMessage ? post.postMessage : '';
        return (
            <section>
                <PostContent message={message} />
            </section>
        )
    }
}

function mapState(s, p) {
    return {
        postsOfComment: selector.getPostOfComments(s)
    }
}

export default connect(mapState)(PostCell);