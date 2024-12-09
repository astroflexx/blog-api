import PropTypes from "prop-types";

const CommentUpdateForm = ({
  updatedContent,
  setUpdatedContent,
  onCancel,
  onUpdate,
}) => (
  <div className="card mt-3">
    <div className="card-body">
      <h5 className="card-title">Edit Comment</h5>
      <div className="form-group mb-3">
        <textarea
          className="form-control"
          rows="3"
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
          placeholder="Update your comment"
        />
      </div>
      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-primary" onClick={onUpdate}>
          Save
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  </div>
);

CommentUpdateForm.propTypes = {
  updatedContent: PropTypes.string.isRequired,
  setUpdatedContent: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentUpdateForm;
