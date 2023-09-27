import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";

export default function TweetDetail() {
  const { id } = useParams<{ id: string }>();

  const fetchTweet = async () => {
    const tweetQuery = query(collection(db, "tweets"), where("id", "==", id));

    const snapshot = await getDocs(tweetQuery);
    const tweet = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo } = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    console.log(tweet, "dd");
  };

  useEffect(() => {
    fetchTweet();
  }, [id]);

  return <div>{id}</div>;
}
