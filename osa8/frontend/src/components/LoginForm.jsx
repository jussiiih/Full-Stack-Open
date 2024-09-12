import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"

const LoginForm = ({ setToken, LOGIN, show }) => {

    if (!show) {
        return null
      }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [ login, result ] = useMutation(LOGIN)

    useEffect(() => {
        if ( result.data ) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('books-user-token', token)
        }
    }, [result.data])

    const submit = (event) => {
        event.preventDefault()

        login({ variables: { username, password } })
            .then(()=>{
                setUsername('')
                setPassword('')
            })
    }

    return (

        <div>
            <form onSubmit={submit}>
                <div>
                    Name: 
                    <input
                    value={username}
                    onChange={({target}) => setUsername(target.value)}>
                    </input>
                </div>
                <div>
                    Password: 
                    <input
                    value={password}
                    onChange={({target}) => setPassword(target.value)}>
                    </input>
                </div>
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )

}

export default LoginForm