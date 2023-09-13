import { auth } from "../firebase";

export default function Home() {
  const logOut = () => {
    auth.signOut();
  };

  const user = auth.currentUser;
  return (
    <h1>
      <p>
        hi! <br /> {user?.displayName}
      </p>
      <button onClick={logOut}>Log Out</button>!
    </h1>
  );
}
