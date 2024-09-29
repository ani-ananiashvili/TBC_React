import "./Contact.css";

function Contact() {
  return (
    <div className="contact-container">
        <div>
      <h2>Contact Us</h2>
      <p>Email: contact@gmail.com</p>
      <p>Contact Number: + 111 010 101</p>
      </div>
      <form className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" required></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Contact;
