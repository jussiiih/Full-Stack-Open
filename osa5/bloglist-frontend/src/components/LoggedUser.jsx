const LoggedUser = ({user, handleLogout}) => (
    
    <div>
        <h2>Blogs</h2>
        <p>{user.name} logged in 
        <button type='submit' onClick={handleLogout}>Logout</button>
        </p>
  </div>
  )

export default LoggedUser