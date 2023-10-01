import { styled } from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { Link } from "react-router-dom";

const Wrapper = styled(Link)`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 10px 30px 10px 20px;
  border-bottom: 1px solid #38444d;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 700;
  font-size: 1rem;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-weight: 500;
  font-size: 1rem;
`;

const Button = styled.button`
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const DeleteButton = styled(Button)`
  background-color: tomato;
`;

const UpdateButton = styled(Button)`
  background-color: #1d9bf0;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  };

  return (
    <Wrapper to={`/tweet/${id}`}>
      <div>
        {user?.photoURL ? (
          <img
            src={user?.photoURL || ""}
            alt="avatar"
            style={{ width: "40px", borderRadius: "50%" }}
          />
        ) : null}
      </div>
      <Column>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
        {photo ? <Photo src={photo} /> : null}
        {/* {user?.uid === userId ? (
          <ButtonWrapper>
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
            <UpdateButton>Update</UpdateButton>
          </ButtonWrapper>
        ) : null} */}
      </Column>
    </Wrapper>
  );
}
