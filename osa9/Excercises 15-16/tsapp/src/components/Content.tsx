const Content = ({ courses }: { courses: Array< {name:string, exerciseCount: number }>}): JSX.Element => {
    return (
        <div>
            {courses.map((course) => (
            <p key={course.name}>
                {course.name} {course.exerciseCount}
            </p>
            ))}
        </div>

    );
};


export default Content;