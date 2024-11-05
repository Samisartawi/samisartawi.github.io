function handleRegistration(event) {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;

  const specialCharRegex = /[!?]/;
  if (!specialCharRegex.test(password)) {
    document.getElementById('result').innerHTML = `<p class="text-danger">Registration failed: Password must contain ! or ?</p>`;
    return;
  }

  const maskedPassword = '*'.repeat(password.length);

  const user = {
    firstName,
    lastName,
    email,
    password: maskedPassword,
    dob
  };

  document.getElementById('result').innerHTML = `
    <h3>Registration Successful!</h3>
    <p><strong>First Name:</strong> ${user.firstName}</p>
    <p><strong>Last Name:</strong> ${user.lastName}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Date of Birth:</strong> ${user.dob}</p>
    <p><strong>Password:</strong> ${user.password}</p>
  `;
}
