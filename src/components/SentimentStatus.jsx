import React from "react"
import PropTypes from "prop-types"

const SentimentStatus = ({ sentiment }) => {
    return (
        <section className="sentiment-status">
            <div className={`sentiment-text-container sentiment-status-${sentiment}`}>
                <h5 className="text">{sentiment}</h5>
            </div>
        </section>
    )
}

SentimentStatus.propTypes = {
    sentiment: PropTypes.string
}

SentimentStatus.defaultProps = {
    sentiment: ""
}

export default SentimentStatus;