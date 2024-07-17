import PropTypes from 'prop-types'

const Login = ({ handleLogin, username, password, setUsername, setPassword }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
            Username:
          <input type='text' value={username} name="username" onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            Password:
          <input type='text' value={password} name="password" onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default Login