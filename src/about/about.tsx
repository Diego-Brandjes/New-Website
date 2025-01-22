import VerticalMenu from "../components/navbar";


function about() {
    return (
        // Code here
        <body className="body">
        
        <main>    

        <div className="container">
            <div className="bento-box poppins-regular">

                <div className="item long button">  
                    <VerticalMenu/>
                </div>

                <div className="item large">
                <p className="small-text">Aspect Ratio</p>
                    <h1>3:2</h1>

                
                </div>

                <div className="item small">                
                    <h3>6240</h3>

                </div>

                <div className="item medium"><h2>About Me</h2></div>


                <div className="item long">

                </div>
                <div className="item medium"></div>

                <div className="item small"></div>

                <div className="item small"></div>

                <div className="item small">
                    <img 
                        src="/fujifilm-2-logo-svg-vector.svg"
                        loading="lazy" 
                        alt="Camera Brand" 
                        className="test"
                    />
                </div>
                <div className="item medium">
                    <p className="small-text">Camera</p>
                    <h3>Fujifilm XT30-II</h3>
                    </div>

            </div>
        </div>
        </main>
        </body>

            );
}
export default about;