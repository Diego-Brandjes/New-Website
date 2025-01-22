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
                <div className="item large">Large</div>
                <div className="item small">About me</div>
                <div className="item large">Bento</div>
                <div className="item long">
                    <ul>
                        <li>Item a</li>
                        <li>Item b</li>
                        <li>Item c</li>
                        <li>Item d</li>
                    </ul>
                </div>
                <div className="item small">16:9</div>
                    <div className="item small">123</div>
                <div className="item small">
                    <img 
                        src="/fujifilm-2-logo-svg-vector.svg"
                        loading="lazy" 
                        alt="Camera Brand" 
                        className="test"
                    />
                </div>
                    <div className="item medium">Socials</div>
            </div>
        </div>
        </main>
        </body>

            );
}
export default about;