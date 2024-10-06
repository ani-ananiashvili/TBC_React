import "./Profile.css";

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src="https://scontent.ftbs5-3.fna.fbcdn.net/v/t39.30808-6/459305409_1059122095722747_3578119924291447655_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFFWxdhkorxXAGN3MLDqorTYsidthu6XXNiyJ22G7pdc3eZ5SWFWSiCTgbeBDJ0OpZsEj4MX5pYD5OdMdINejJ_&_nc_ohc=mrfbU3MXJzIQ7kNvgFYEQQ1&_nc_ht=scontent.ftbs5-3.fna&_nc_gid=AR3JpQKs5IedxGGkniDR8hv&oh=00_AYAJqwLMhXF178WakcKRDUI_tuygIzjXn_DDpeaAFIL3Ug&oe=67037A0A"
          alt="Profile"
          className="profile-photo"
        />
        <h1>Profile</h1>
      </div>
      <form className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input className="profile-input" type="text" id="name" value="Ani" readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname:</label>
          <input className="profile-input" type="text" id="surname" value="Ananiashvili" readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input className="profile-input" type="email" id="email" value="ananiashvili.ani@tbcacademy.edu.ge" readOnly />
        </div>
      </form>
    </div>
  );
}

export default Profile;
