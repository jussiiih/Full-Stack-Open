import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = (props) => {
    return (
        <div>
            <Header text={props.course.name}/>
            <Content parts = {props.course.parts}/>
            <Total total= {props.course.parts}/>
        </div>    
    )
}

export default Course