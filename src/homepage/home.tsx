import VerticalMenu from "../components/navbar.tsx"
import useScrollAnimation from "../components/useScrollAnimation.tsx";

function home() {
    useScrollAnimation();

    return (
    <body className="body">

            {/* Load menu */}
            <div className="menu-container ">
                <VerticalMenu />
            </div>
       
    <main>    

        {/* Page banner  */}
        <div className="page-banner">
            <img 
              src="/page.svg"
              loading="lazy" 
              alt="Logo" 
              className="logo animate-on-scroll" 
            />
        </div>

        {/* First background parallax */}
        <section className="parallax bg"></section>


        <div className="intro">
                <div className="page-card-wide poppins-thin">
                    <p className="animate-on-scroll extra-padding">I'm Diego — a Travel Photographer with a passion for video editing. I capture the world through my lens and enjoy creating compelling stories with my visuals.</p>
                    <p className="animate-on-scroll poppins-small">more</p>
                </div>
        </div>

        {/* Chapter Page */}
        <section className="parallax bg2"></section>
        <div className="chapter">
            <div className="animate-on-scroll container-wide">
                <div className="page-card-small poppins-thin">

                    <h1 className="overlap poppins-bold">Fukuoka</h1>
                    <p>
                    Fukuoka is a lively city in southern Japan, known for its mix of history, modern charm, and delicious food. With beautiful parks, ancient temples, and famous ramen, its a perfect place to relax and explore.
                    </p>
                </div>

                <div className="page-card-small ">
                    <img src="asd.png" alt="Osaka Castle" />
                </div>
            </div>
        </div>

        {/* Chapter Page */}
        <section className="parallax bg2"></section>
        <div className="chapter">
            <div className="animate-on-scroll container-wide">

                <div className="page-card-small">
                    <img src="asd.png" alt="Osaka Castle" />
                </div>
                <div className="page-card-small poppins-thin">
                    <h1 className="overlap poppins-bold">Fukuoka</h1>
                    <p>
                        Fukuoka is a lively city in southern Japan, known for its mix of history, modern charm, and delicious food. With beautiful parks, ancient temples, and famous ramen, its a perfect place to relax and explore.

                    </p>
                </div>
            </div>
        </div>
        

    </main>
    </body>
    );
}
export default home;