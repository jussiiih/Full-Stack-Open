import { CoursePart } from "../App";

const Part = ( {part}: {part: CoursePart} ) => {

    switch (part.kind) {
        case "basic":
            return (
                <div>
                    <p>
                        <strong>{part.name} {part.exerciseCount}</strong>
                    </p>
                    <p>
                        <i>{part.description}</i>
                    </p>
                </div>
            );
        case "group":
            return (
                <div>
                    <p>
                        <strong>{part.name} {part.exerciseCount}</strong>
                    </p>
                    <p>
                        Project Exercises {part.groupProjectCount}
                    </p>
                </div>
            );
            case "background":
                return (
                    <div>
                    <p>
                        <strong>{part.name} {part.exerciseCount}</strong>
                    </p>
                    <p>
                        <i>{part.description}</i>
                    </p>
                    <p>
                        Submit to <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
                    </p>
                </div>
                );
                case "special":
                    console.log(part.requirements)
                    return (
                        <div>
                            <p>
                                <strong>{part.name} {part.exerciseCount}</strong>
                            </p>
                            <p>
                                <i>{part.description}</i>
                            </p>
                            <p>
                                Required Skills: {part.requirements.join(', ')}
                            </p>
                        </div>
                    );
            default:
                return <p>Unknown part type</p>;
    }
}

export default Part;