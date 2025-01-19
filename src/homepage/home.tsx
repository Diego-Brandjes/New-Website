import VerticalMenu from "../components/navbar.tsx"

function home() {
    return (
        <body className="body">
        <VerticalMenu />
        
        <main>       
        <div className="test">
            <h1 className="poppins-bold">Japan </h1>
            <h2 className="reddit-mono"> '25</h2>
        </div>

        <section className="parallax bg"></section>

        <div className="page">

                <div className="image-card">
                    <p className="poppins-regular">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
                </div>

                <div className="image-card">
                    <img src="tokyo-bay.jpg" alt="Osaka Castle" />
                </div>

                <div className="image-card">
                    <img src="matsumoto.jpg" alt="Osaka Castle" />
                </div>

                <div className="image-card">
                    <img src="hiroshima.jpg" alt="Osaka Castle" />
                </div>

                <div className="image-card">
                    <img src="nakasendo.jpg" alt="Osaka Castle" />
                </div>

                <div className="image-card">
                    <p className="poppins-regular">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
                </div>
        </div>

        <section className="parallax bg2"></section>


        

        </main>
        </body>
    );
}
export default home;