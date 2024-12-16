import Part from "./Part";
import { CoursePart } from "../App";

const Content = ({ courses }: { courses: CoursePart[]}): JSX.Element => {
    return (
        <div>
            {courses.map((course) => (
                <Part key={course.name} part={course}/>
            ))}
        </div>

    );
};


export default Content;