const ErrorMessage = ({message}: {message: string}): JSX.Element => {
    return (
        <p style={{ color: 'red' }}><strong>{message}</strong></p>
    )
}

export default ErrorMessage