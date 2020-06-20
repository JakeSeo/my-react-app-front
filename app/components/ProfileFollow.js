import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import LoadingDotsIcon from "./LoadingDotsIcon";
import StateContext from "../StateContext";

function ProfileFollow(props) {
  const appState = useContext(StateContext);
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  var url = "";

  if (props.action == "followers") {
    url = `/profile/${username}/followers`;
  } else if (props.action == "following") {
    url = `/profile/${username}/following`;
  }
  console.log(url);

  useEffect(() => {
    setIsLoading(true);
    const ourRequest = Axios.CancelToken.source();
    async function fetchPosts() {
      try {
        const response = await Axios.get(url, { cancelToken: ourRequest.token });
        setPosts(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log("There was a problem.");
      }
    }
    fetchPosts();
    return () => {
      ourRequest.cancel();
    };
  }, [username, url]);

  if (isLoading) return <LoadingDotsIcon />;

  if (posts.length == 0) {
    if (url.endsWith("followers")) {
      if (username == appState.username) return <p className="lead text-muted">You do not have any followers yet!</p>;
      else if (username != appState.username)
        return (
          <>
            <p className="lead text-muted">{username} does not have any followers yet!</p>
            {appState.loggedIn && `Be the first one to follow ${username}!`}
            {!appState.loggedIn && (
              <>
                `To follow {username}, <Link to="/">sign up</Link> first!
              </>
            )}
          </>
        );
    } else if (url.endsWith("following")) {
      return <p className="lead text-muted">{username} do not follow anyone yet!</p>;
    }
  }

  return (
    <div className="list-group">
      {posts.map((follower, index) => {
        return (
          <Link key={index} to={`/profile/${follower.username}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={follower.avatar} /> {follower.username}
          </Link>
        );
      })}
    </div>
  );
}

export default ProfileFollow;
