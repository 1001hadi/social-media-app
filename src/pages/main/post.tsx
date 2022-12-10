import { useEffect, useState } from "react";
import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { Post as IPost } from "./main";

interface Props {
  post: IPost;
}

interface Like {
  likeId: string;
  userId: string;
}
export const Post = (props: Props) => {
  const [likes, setLikes] = useState<Like[] | null>(null);
  const { post } = props;
  const [user] = useAuthState(auth);
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToBeDelete = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToBeDeleteFromData = await getDocs(likeToBeDelete);
      const likeToRemove = doc(db, "likes", likeToBeDeleteFromData.docs[0].id);

      await deleteDoc(likeToRemove);
      if (user) {
        setLikes(
          (prev) =>
            prev &&
            prev.filter(
              (like) => like.likeId !== likeToBeDeleteFromData.docs[0].id
            )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const userLikedIt = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p>@{post.username}</p>
        <button onClick={userLikedIt ? removeLike : addLike}>
          {userLikedIt ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {likes && <p>Likes: {likes?.length}</p>}
      </div>
    </div>
  );
};
