import React, { useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";

const ElementDemos = ({ demos }) => {
  const location = useLocation();
  const history = useHistory();
  const [itent, setItent] = useState("");

  const fetchClientSecret = () => {
    fetch("https://node-for-stripe.herokuapp.com/secret")
      .then((response) => response.json())
      .then((SECRET) => {
        console.log(SECRET);
        setItent(SECRET.client_secret);
      });
  };

  return (
    <div className="DemoWrapper">
      <div className="DemoPickerWrapper">
        <select
          className="DemoPicker"
          value={location.pathname}
          onChange={(event) => {
            history.push(event.target.value);
          }}
        >
          {demos.map(({ path, label }) => (
            <option key={path} value={path}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <h1>Step 1</h1>
      <button onClick={fetchClientSecret}>get payment intent</button>
      <p>CLIENT_SECRET:</p>
      <p>{itent}</p>
      <h1>Step 2</h1>
      <Switch>
        <Redirect to={demos[0].path} from="/" exact />
        {demos.map(({ path, component: Component }) => (
          <Route key={path} path={path}>
            <div className="Demo">
              <Component CLIENT_SECRET={itent} />
            </div>
          </Route>
        ))}
      </Switch>
    </div>
  );
};

export default ElementDemos;
