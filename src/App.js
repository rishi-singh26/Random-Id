import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [identities, setIdentities] = useState([]);

  const lastRef = useRef(null);

  useEffect(() => {
    getIdentity();
  }, []);

  const getIdentity = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://randomuser.me/api/");
    xhr.onload = function () {
      if (xhr.status === 200) {
        setIdentities([...identities, JSON.parse(xhr.responseText).results[0]]);
        lastRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    };
    xhr.send();
  };

  const getFullName = (nameObject) => {
    return `${nameObject.title} ${nameObject.first} ${nameObject.last}`;
  }

  return (
    <div className="main">
      <h1>Generate Random Identity</h1>
      <div className="identities">
        {identities.map((identity, index) => {
          const name = getFullName(identity.name);
          return (
            <div className="content">
              <div className="row">
                <img src={identity.picture.large} alt={`${name} profile`}></img>
                <div>
                  <h3>{name}</h3>
                  <h3>Gender: {identity.gender}</h3>
                </div>
              </div>
              <div className='column'>
                <h3>Location</h3>
                <p>Street: {identity.location.street.number}, {identity.location.street.name}</p>
                <p>City: {identity.location.city}</p>
                <p>State: {identity.location.state}</p>
                <p>Country: {identity.location.country}</p>
                <p>PostCode: {identity.location.postcode}</p>
                <p>Coordinates: {identity.location.coordinates.latitude}, {identity.location.coordinates.longitude}</p>
                <p>Time zone: {identity.location.timezone.offset} :: {identity.location.timezone.description}</p>
              </div>
              <h3 className='column'>Email: {identity.email}</h3>
              <div className='column'>
                <h3>Login Details:</h3>
                <p>User name: {identity.login.username}</p>
                <p>Password: {identity.login.password}</p>
                <p>UUID: {identity.login.uuid}</p>
                <p>Salt: {identity.login.salt}</p>
                <p>MD5: {identity.login.md5}</p>
                <p>SHA1: {identity.login.sha1}</p>
                <p>SHA256: {identity.login.sha256}</p>
              </div>
              <div className='column'>
                <h3>Date of borth details</h3>
                <p>Date: {identity.dob.date}, Age: {identity.dob.age}</p>
              </div>
              <div className='column'>
                <h3>Registration Details</h3>
                <p>Registration date {identity.registered.date}, Registration age {identity.registered.age}</p>
              </div>
              <div className='column'>
                <h3>Phone no: {identity.phone}</h3>
                <h3>Cell no: {identity.cell}</h3>
              </div>
            </div>
          );
        })}
        <div className="end-empty-box" ref={lastRef}></div>
      </div>
      <button onClick={() => getIdentity()} className="another-button">
        <span className="button_top">Another Identity</span>
      </button>
      <p>
        Developed by{" "}
        <a
          href="https://github.com/rishi-singh26/Random-Id-React"
          target="_blank"
          rel="noreferrer"
        >
          Rishi Singh
        </a>
      </p>
    </div>
  );
}

export default App;
