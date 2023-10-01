import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

export default function TweetDetail() {
  const { id } = useParams<{ id: string }>();
  const [tweet, setTweet] = useState<ITweet | null>(null);

  const fetchTweet = async () => {
    const tweetQuery = query(
      collection(db, `tweets`),
      where("__name__", "==", id)
    );

    const snapshot = await getDocs(tweetQuery);
    const data = snapshot.docs.map((doc) => {
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

    data ? setTweet(data[0]) : setTweet(null);
  };

  useEffect(() => {
    fetchTweet();
  }, [id]);

  return (
    <div>
      <h1 className="text-red-400">{tweet?.id}</h1>
      <h1>{tweet?.tweet}</h1>
      <h1>{tweet?.userId}</h1>
      <h1>{tweet?.username}</h1>
      <h1>{tweet?.photo}</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}
