import Course from './Course'

const Course_list = (props) => {
    console.log(props)
    return (
        <>
        {props.course_list.map(course =>
        (<Course key={course.id} course = {course}/>))}
        </>
        )

}

export default Course_list