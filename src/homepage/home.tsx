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

        {/* Intro Part */}
        <div className="intro">
            <div className="page-card-wide poppins-thin">
                <h4 className="animate-on-scroll extra-padding">I'm Diego — a Travel Photographer with a passion for video editing. I capture the world through my lens and enjoy creating compelling stories with my visuals.</h4>
                <p className="animate-on-scroll">Scroll for more</p>
            </div>
        </div>

        {/* Chapter Page */}
        <section className="parallax bg2"></section>
        <div className="chapter">
            <div className="animate-on-scroll page-card-holder">
                <div className="page-card-small poppins-thin page-card-text">

                    <h1 className="overlap poppins-bold">Fukuoka</h1>
                    <p>
                    Fukuoka is a lively city in southern Japan, known for its mix of history, modern charm, and delicious food. With beautiful parks, ancient temples, and famous ramen, its a perfect place to relax and explore.
                    </p>
                </div>

                <div className="page-card-small">
                    <img src="asd.png" alt="Osaka Castle" />
                </div>
            </div>
        </div>

        {/* Chapter Page */}
        <section className="parallax bg2"></section>
        <div className="chapter">
            <div className="animate-on-scroll page-card-holder">

                <div className="page-card-small">
                    <img src="asd.png" alt="Osaka Castle" />
                </div>
                <div className="page-card-small poppins-thin page-card-text">
                    <h1 className="overlap poppins-bold">Fukuoka</h1>
                    <p>
                        Fukuoka is a lively city in southern Japan, known for its mix of history, modern charm, and delicious food. With beautiful parks, ancient temples, and famous ramen, its a perfect place to relax and explore.
                    </p>
                </div>
            </div>
        </div>
        

        {/* About Page */}
        <div className="chapter">
            <div className="animate-on-scroll page-card-holder">
            <div className="page-card-small poppins-thin page-card-text">
            <h2 className="overlap poppins-bold">About Me</h2>
                </div>
                <div className="page-card-small poppins-thin page-card-text">

                </div>
                <div className="page-card-small poppins-thin page-card-text">
                    <p>
                        Fukuoka is a lively city in southern Japan, known for its mix of history, modern charm, and delicious food. With beautiful parks, ancient temples, and famous ramen, its a perfect place to relax and explore.
                    </p>
                </div>
                <div className="page-card-small poppins-thin page-card-text">
                    <ul>
                        <li><h3>Fujifilm XT30II</h3></li>
                        <li><h3>26.1MP</h3></li>
                        <li><h3>X-Trans CMOS 4</h3></li>
                        <li><h3>6240x4160</h3></li>
                        <li><h3>Aspect Ratio 3:2</h3></li>
                        <li><h3>-</h3></li>
                        <li><h3>Diego Brandjes</h3></li>
                        <li><h3>Email</h3></li>
                    </ul>
                </div>
            </div>
        </div>
        

    </main>
    </body>
    );
}
export default home;