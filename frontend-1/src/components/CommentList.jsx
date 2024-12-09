import PropTypes from "prop-types";
import { useState } from "react";
import Comment from "./Comment";
import CommentUpdateForm from "./CommentUpdateForm";

const CommentList = ({
  comments,
  isLoggedIn,
  username,
  onDeleteComment,
  onUpdateComment,
}) => {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [updatedContent, setUpdatedContent] = useState("");

  const handleEditClick = (commentId, currentContent) => {
    setEditingCommentId(commentId);
    setUpdatedContent(currentContent);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setUpdatedContent("");
  };

  const handleUpdateComment = (commentId) => {
    const updatedComment = { content: updatedContent };
    onUpdateComment(updatedComment, commentId);
    setEditingCommentId(null);
    setUpdatedContent("");
  };

  return (
    <div className="comment-list mt-4">
      {comments.length === 0 ? (
        <p className="text-muted">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              {editingCommentId === comment.id ? (
                <CommentUpdateForm
                  updatedContent={updatedContent}
                  setUpdatedContent={setUpdatedContent}
                  onCancel={handleCancelEdit}
                  onUpdate={() => handleUpdateComment(comment.id)}
                />
              ) : (
                <>
                  <Comment comment={comment} />
                  {isLoggedIn && comment.author.username === username && (
                    <div className="d-flex justify-content-end mt-3">
                      <button
                        className="btn btn-warning me-2"
                        onClick={() =>
                          handleEditClick(comment.id, comment.content)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => onDeleteComment(comment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
      author: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string,
  onDeleteComment: PropTypes.func.isRequired,
  onUpdateComment: PropTypes.func.isRequired,
};

export default CommentList;
