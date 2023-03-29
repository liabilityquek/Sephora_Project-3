import "./Header.css"

export const Header = () => {
    return(
        <>
            <div className="container">
                <div className="nav-container">
                        <li>MY ACCOUNT</li> 
                    <div className="left">
                        <li>REGISTER</li>
                        <li>|</li>
                        <li>SIGN IN</li>
                    </div>
                    {/* <div className="right"> */}
                        <li>GET THE APP</li>
                        <li>STORES & SERVICES</li>
                        <li>//image</li>
                        <li>BAG</li>
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}