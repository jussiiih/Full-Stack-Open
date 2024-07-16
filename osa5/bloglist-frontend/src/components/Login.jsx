const Login = ({handleLogin, username, password, setUsername, setPassword}) => (
    <div>
    <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
          <div>
            Username: 
            <input type='text' value={username} name="username" onChange={({target}) => setUsername(target.value)}
          />
          </div>
          <div>
            Password: 
            <input type='text' value={password} name="password" onChange={({target}) => setPassword(target.value)}
          />
          </div>
          <div>
            <button type='submit'>Login</button>
          </div>
        </form>
    </div>

  )

export default Login