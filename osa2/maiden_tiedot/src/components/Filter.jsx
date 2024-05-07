const Filter = (props) => {
    return (
        <form>
            <div>
                Find countries<input value={props.value} onChange={props.onChange}/>
            </div>
        </form>
    )
    }

    export default Filter
