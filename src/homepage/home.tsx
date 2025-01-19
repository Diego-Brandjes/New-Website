import VerticalMenu from "../components/navbar.tsx"

function home() {
    return (
        <body className="body">
        <VerticalMenu />
        
        <main>       

        <section className="parallax bg"></section>

        <section className="page">
            {/* <p>The sound that occurs when you snap your fingers is made by your middle finger hitting your palm!</p> */}
            <div className="image-gallery">
 
                <div className="image-card">
                    <img src="tokyo-bay.jpg" alt="Osaka Castle" />
                    {/* <div className="caption">
                    <p>大阪</p>
                    </div> */}
                </div>
            </div>

            <div className="image-gallery">
                <div className="image-card">
                    <img src="matsumoto.jpg" alt="Osaka Castle" />
                    {/* <div className="caption">
                    <p>大阪</p>
                    </div> */}
                </div>
            </div>

            <div className="image-gallery">
                <div className="image-card">
                    <img src="okinawa.jpg" alt="Osaka Castle" />
                    {/* <div className="caption">
                    <p>大阪</p>
                    </div> */}
                </div>
            </div>
        </section>
        <section className="parallax bg"></section>


        

        </main>
        </body>
    );
}
export default home;