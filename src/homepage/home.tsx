import VerticalMenu from "../components/navbar.tsx"

function home() {
    return (
        <body className="body">
            <VerticalMenu />

            <div className="banner">
                <div className="banner-text">
                    <div className="together">
                        <h1 className="poppins-bold">Japan</h1>
                        <h2 className="reddit-mono">'23</h2>
                    </div>
                        <p className="poppins-regular">A seven Month journey through the land of the rising sun.</p>
                </div>
            </div>


            

        </body>
    );
}
export default home;