import React, { useState, useEffect } from "react";
import First from "./First";
import Presale from "./Presale";
import Forget from "./Forget";
import Verify from "./Verify";
import Register from "./Register";
import Home from "./components/Home";
import Setting from "./components/Setting";
import Coming from "./components/Coming";
import Transaction from "./components/Transaction";
import Affilation from "./components/Affilation";
import Tfaverify from "./components/Tfaverify";
import EmailVerify from "./components/EmailVerify";
import LanguageSwitcher from "./components/LanguageSwitcher";
import NewHome from "./NewComponents/Home";
import SideBar from "./NewComponents/SideBar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState(0);

  const childToParent = async (childdata) => {
    await setPhone(childdata.phone);
    await setEmail(childdata.email);
    await setUserId(childdata.id);
  };

  return (
    <React.Fragment>
      <div className="root-body bg-white d-flex jusify-content-between">
        <SideBar />
        <div className="main-panel flex-fill">
          <Router>
            <Switch>
              <Route exact path="/">
                <LanguageSwitcher />
                <Home />
              </Route>
              <Route exact path="/home">
                <NewHome />
              </Route>

              <Route path="/register">
                <LanguageSwitcher />
                <Register />
              </Route>
              <Route path="/register/:user_id">
                <LanguageSwitcher />
                <Register />
              </Route>

              <Route path="/email-verify">
                <LanguageSwitcher />
                <Tfaverify />
              </Route>

              <Route path="/forget">
                <LanguageSwitcher />
                <Forget />
              </Route>

              <Route path="/verify">
                <LanguageSwitcher />
                <Verify />
              </Route>

              <Route path="/signup/email-verification/:randomCode">
                <LanguageSwitcher />
                <EmailVerify />
              </Route>
              {/*           
          <Route path="/verification/:verifyStatus">
            <LanguageSwitcher />
            <First />
          </Route>             */}

              <div className="content">
                <Route path="/presale/home">
                  <Presale email={email} phone={phone} userId={userId} />
                  <Home childToParent={childToParent} />
                </Route>
                <Route path="/presale/transaction">
                  <Presale email={email} phone={phone} userId={userId} />
                  <Transaction childToParent={childToParent} />
                </Route>
                <Route path="/presale/affilation">
                  <Presale email={email} phone={phone} userId={userId} />
                  <Affilation childToParent={childToParent} />
                </Route>
                <Route path="/presale/setting">
                  <Presale email={email} phone={phone} userId={userId} />
                  <Setting childToParent={childToParent} />
                </Route>
                <Route path="/presale/coming">
                  <Presale email={email} phone={phone} userId={userId} />
                  <Coming />
                </Route>
              </div>
            </Switch>
          </Router>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
