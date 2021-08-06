interface VideoProps {
    search: string
}

function VideoGrid ({search} : VideoProps) {
    return (
        <>
            <h2>VideoGrid</h2>
            <p>{search}</p>
        </>
    )

}

export default VideoGrid