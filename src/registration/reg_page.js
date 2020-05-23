import Footer from "../Footer/footer";
import React from "react";
import './reg_page.css'

function RegPage() {
    return (
        <div className="App">
            {/*<header className="App-header">

      </header>*/}

                header

            <div className = "greyComponent">
                <form>
                    <label>
                        E-mail
                        <input type="e-mail" name="name" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <form>
                    <label>
                        Password
                        <input type="password" name="name" />
                    </label>
                </form>
                <form>
                    <label>
                        Repeat password
                        <input type="password" name="name" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <Footer/>
        </div>

    );
}

export default RegPage;