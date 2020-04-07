import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Particles from "react-particles-js";

const particlesOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
}

const initialState = {
    input: "",
    imgUrl: "",
    boxes: [],
    route: "signin",
    isSignedIn: false,
    user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: "",
            imgUrl: "",
            boxes: [],
            route: "signin",
            isSignedIn: false,
            user: {
                id: "",
                name: "",
                email: "",
                entries: 0,
                joined: ""
            }
        };
    }

    loadUser = data => {
        this.setState({ user: data });
    };

    calculateFaceLocations = data => {
        return data.outputs[0].data.regions.map(face => {
            const clarifaiFace = face.region_info.bounding_box;
            const image = document.getElementById("inputImage");
            const width = Number(image.width);
            const height = Number(image.height);
            return {
                leftCol: clarifaiFace.left_col * width,
                topRow: clarifaiFace.top_row * height,
                rightCol: width - clarifaiFace.right_col * width,
                bottomRow: height - clarifaiFace.bottom_row * height
            };
        });
    }

    displayFaceBoxes = boxes => {
        this.setState({ boxes });
    };

    onInputChange = event => {
        this.setState({ input: event.target.value });
    };

    onButtonClick = event => {
        this.setState({ imgUrl: this.state.input });
        fetch("https://mysterious-reef-18033.herokuapp.com/face_url", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                url: this.state.input
            })
        })
            .then(res => res.json())
            .then(response => {
                if (response) {
                    fetch("https://mysterious-reef-18033.herokuapp.com/image", {
                        method: "put",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(res => res.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, { entries: count }));
                        });
                }
                this.displayFaceBoxes(this.calculateFaceLocations(response));
                window.scroll(0, document.body.scrollHeight);
            })
            .catch(e => console.log(e));
    };

    onRouteChange = route => {
        if (route === "signin") {
            this.setState(initialState);
        } else if (route === "home") {
            this.setState({ isSignedIn: true });
        }
        this.setState({ route: route });
    };

    render() {
        const { isSignedIn, imgUrl, boxes, route, user } = this.state;

        return (
            <div className="App">
                <Particles params={particlesOptions} className='particles' />
                <Navigation
                    isSignedIn={isSignedIn}
                    onRouteChange={this.onRouteChange}
                />
                {route === "home" ? (
                    <div>
                        <Logo />
                        <Rank name={user.name} entries={user.entries} />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonClick={this.onButtonClick}
                        />
                        <FaceRecognition boxes={boxes} imageUrl={imgUrl} />
                    </div>
                ) : route === "signin" ? (
                    <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                ) : (
                            <Register
                                loadUser={this.loadUser}
                                onRouteChange={this.onRouteChange}
                            />
                        )}
            </div>
        );
    }
}

export default App;
