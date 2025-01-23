import Drag from "../components/throw";

function NotFound() {
    return (
        <div className="notfound-page">
            <div className="drag-container">
                <Drag />
            </div>
            <div className="notfound-content">
                <h2 className="poppins-thin">
                    The page you are looking for doesn't exist or has been moved.
                </h2>
            </div>
        </div>
    );
}


export default NotFound;