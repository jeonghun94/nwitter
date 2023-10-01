import { styled } from 'styled-components';
import { ITweet } from '../timeline';
import { auth, db, storage } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { Link } from 'react-router-dom';
import { getTimeAgoString } from '@/utils';
import SVG from '../SVG';

const Wrapper = styled(Link)`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 15px;
  border-bottom: 1px solid #38444d;
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;

const Username = styled.p`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1rem;
`;

const CreatedAt = styled.span`
  margin-left: 10px;
  font-size: 0.8rem;
  font-weight: 400;
  color: #71767b;
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

export default function Tweet({
  username,
  photo,
  tweet,
  userId,
  id,
  createdAt,
}: ITweet) {
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm('Are you sure you want to delete this tweet?');
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, 'tweets', id));
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
      <div
        style={{
          minWidth: '40px',
        }}
      >
        {user?.photoURL ? (
          <img
            src={user?.photoURL || ''}
            alt="avatar"
            style={{ width: '40px', borderRadius: '50%' }}
          />
        ) : null}
      </div>
      <Column>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Username>
            {username}
            <CreatedAt>{getTimeAgoString(createdAt)}</CreatedAt>
          </Username>
          <SVG size={20} fill="#71767b">
            <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
          </SVG>
        </div>
        <Payload>{tweet}</Payload>

        {photo && <Photo src={photo} />}

        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '15px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <SVG size={20} fill="#71767a">
              <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
            </SVG>
            <p
              style={{
                fontSize: '0.8rem',
                color: '#71767a',
              }}
            >
              20
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <SVG size={20} fill="#71767a">
              <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
            </SVG>
            <p
              style={{
                fontSize: '0.8rem',
                color: '#71767a',
              }}
            >
              20
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <SVG size={20} fill="#71767a">
              <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
            </SVG>
            <p
              style={{
                fontSize: '0.8rem',
                color: '#71767a',
              }}
            >
              20
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <SVG size={20} fill="#71767a">
              <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
            </SVG>
            <p
              style={{
                fontSize: '0.8rem',
                color: '#71767a',
              }}
            >
              20
            </p>
          </div>
          <SVG size={20} fill="#71767a">
            <path d="M17 4c-1.1 0-2 .9-2 2 0 .33.08.65.22.92C15.56 7.56 16.23 8 17 8c1.1 0 2-.9 2-2s-.9-2-2-2zm-4 2c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4c-1.17 0-2.22-.5-2.95-1.3l-4.16 2.37c.07.3.11.61.11.93s-.04.63-.11.93l4.16 2.37c.73-.8 1.78-1.3 2.95-1.3 2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4c0-.32.04-.63.11-.93L8.95 14.7C8.22 15.5 7.17 16 6 16c-2.21 0-4-1.79-4-4s1.79-4 4-4c1.17 0 2.22.5 2.95 1.3l4.16-2.37c-.07-.3-.11-.61-.11-.93zm-7 4c-1.1 0-2 .9-2 2s.9 2 2 2c.77 0 1.44-.44 1.78-1.08.14-.27.22-.59.22-.92s-.08-.65-.22-.92C7.44 10.44 6.77 10 6 10zm11 6c-.77 0-1.44.44-1.78 1.08-.14.27-.22.59-.22.92 0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2z"></path>
          </SVG>
        </div>
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
