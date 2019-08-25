import React from 'react';
import '../style.css'

class ForumRender extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
                <div className="shared_content">
                    {this.props.comments.map(item => {
                        return (
                            <div
                                key={item.id}
                                className='shared_item'
                            >
                                <div className="book_info">
                                    <span className="book_info_author">
                                        {item.userName}
                                    </span>
                                    <span className="book_info_name">
                                        {item.authorName}
                                    </span>
                                </div >
                                <p>
                                    {item.value}
                                </p>
                            </div>
                        )
                    })}
                </div>
        )
    }
}

export default ForumRender