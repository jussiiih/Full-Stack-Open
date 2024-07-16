const NewBlog = ({title, setTitle, author, setAuthor, url, setUrl, handleNewBlog}) => (
    <div>
        <h2>Create New Blog</h2>
            <form onSubmit={handleNewBlog}>
                <div>
                    Title: 
                    <input type='text' value={title} name="title" onChange={({target}) => setTitle(target.value)}/>
                </div>
                <div>
                    Author: 
                    <input type='text' value={author} name="author" onChange={({target}) => setAuthor(target.value)}/>
                </div>
                <div>
                    URL: 
                    <input type='text' value={url} name="url" onChange={({target}) => setUrl(target.value)}/>
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
    </div>
)

export default NewBlog