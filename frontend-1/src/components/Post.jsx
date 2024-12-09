import PropTypes from "prop-types";

const Post = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p className="card-text">
          <small className="text-muted">by {post.author.username}</small>
        </p>
        <p className="card-text">{post.content}</p>
        <p className="text-muted">
          <small>Created at: {formatDate(post.created_at)}</small>
        </p>
        {post.created_at !== post.updated_at && (
          <p className="text-muted">
            <small>Updated at: {formatDate(post.updated_at)}</small>
          </p>
        )}
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
