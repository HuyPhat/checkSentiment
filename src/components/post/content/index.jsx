import React from 'react';

function PostContent({ message }) {
    return (
        <section style={{ whiteSpace: 'initial' }} dangerouslySetInnerHTML={{ __html: message }} />
    )
}

export default PostContent;