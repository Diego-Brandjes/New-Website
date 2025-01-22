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
                {/* <div className="item medium">About Page 2</div> */}
                <div className="item large">Large Item 1</div>
                <div className="item small">About Page</div>
                <div className="item large">Large Item 5</div>
                <div className="item long">Long Item 4</div>
                <div className="item small">Small Item 8</div>
                <div className="item small">Small Item 6</div>
                <div className="item small">Small Item 7</div>
                <div className="item medium">wide Item 8</div>
            </div>
        </div>
        </main>
        </body>

            );
}
export default about;