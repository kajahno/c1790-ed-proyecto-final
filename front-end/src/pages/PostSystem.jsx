
import Comments from "../components/layout/Homepage-systems/Comments"

const PostSystem = () => {
  return (
    <div>
    
      <Comments
        commentsUrl="http://localhost:5001/c1790-ed-proyecto-final/europe-west2/api"
        currentUserId="1"
      />
    </div>
  );
};

export default PostSystem;