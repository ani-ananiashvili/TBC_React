import "./Profile.css";

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src="https://dummyjson.com/icon/emilys/128"
          alt="Profile"
          className="profile-photo"
        />
        <h1>Profile</h1>
      </div>
      <form className="profile-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input className="profile-input" type="text" id="firstName" value="Emily" readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input className="profile-input" type="text" id="lastName" value="Johnson" readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input className="profile-input" type="email" id="email" value="emily.johnson@x.dummyjson.com" readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <input className="profile-input" type="text" id="gender" value="Female" readOnly />
        </div>
      </form>
    </div>
  );
}

export default Profile;
