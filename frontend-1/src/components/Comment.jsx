import PropTypes from "prop-types";

const Comment = ({ comment }) => (
  <div className="card mb-3">
    <div className="card-body">
      <h5 className="card-title mb-1">
        <strong>{comment.author.username}</strong>
      </h5>
      <p className="card-text mb-2">{comment.content}</p>
      <p className="text-muted mb-0">
        <small>
          Created at: {new Date(comment.created_at).toLocaleString()}
        </small>
      </p>
    </div>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Comment;
