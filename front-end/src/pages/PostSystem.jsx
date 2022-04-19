
import Posts from "../components/layout/Homepage-systems/Posts"

const PostSystem = () => {
  return (
    <div>
    
      <Posts 
        commentsUrl="http://localhost:5001/c1790-ed-proyecto-final/europe-west2/api"
        currentUserId="1"
      />
    </div>
  );
};

export default PostSystem;