const Total = ({courses}: {courses: Array< {name: string, exerciseCount: number}>}): JSX.Element => {
    return (
        <p>
        Number of exercises {courses.reduce((sum, part) => sum + part.exerciseCount, 0)}
        </p>

    );
};

export default Total; 