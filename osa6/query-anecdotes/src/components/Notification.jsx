
import { useNotification } from '../NotificationContext'




const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const { notification } = useNotification()



 // if (true) return null

  return (

    <div style={style} className='notification'>
      {notification}
    </div>
  )
}

export default Notification
