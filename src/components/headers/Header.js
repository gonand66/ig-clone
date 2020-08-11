import "./header.css";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Input, Modal, Button } from "@material-ui/core";
import { auth } from "../../firebase";

export default function Header({ getUsername }) {
  const [openSignup, setOpenSignup] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
        setUsername(authUser.displayName);
      } else {
        setUser(null);
        /// user has loged out...
      }
    });
    return () => {
      ///perform some clean up action...
      unsubscribe();
    };
  }, [user, username]);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpenSignup(false);
    getUsername(username);
  };

  const login = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenLogin(false);
  };

  return (
    getUsername(username),
    (
      <div>
        <header>
          <div className="ig_logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
              alt="logo"
              style={{ height: 40 }}
            />
          </div>
          {user ? (
            <Button
              style={{ fontWeight: "bolder" }}
              onClick={() => {
                auth.signOut();
              }}
            >
              Logout
            </Button>
          ) : (
            <div>
              <Button
                style={{ fontWeight: "bolder" }}
                onClick={() => setOpenLogin(true)}
              >
                Login
              </Button>
              <Button
                style={{ fontWeight: "bolder" }}
                onClick={() => setOpenSignup(true)}
              >
                Sign Up
              </Button>
            </div>
          )}
        </header>

        {/* //////Modal SignUp//////// */}
        <Modal open={openSignup} onClose={() => setOpenSignup(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form>
              <center>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
                  alt="logo"
                  style={{ height: 40 }}
                />
              </center>
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>
                Sign Up
              </Button>
            </form>
          </div>
        </Modal>

        {/* //////Modal LogIn//////// */}
        <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form>
              <center>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
                  alt="logo"
                  style={{ height: 40 }}
                />
              </center>
              <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={login}>
                Login
              </Button>
            </form>
          </div>
        </Modal>
      </div>
    )
  );
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
