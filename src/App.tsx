import * as React from "react";
import "./App.css";
import g from "glamorous";
import {css} from "glamor";

css.global("*", {
    fontFamily: "Helvetica",
});

const Flex = g.div({
    display: "flex",
});

const Container = g(Flex)({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    aligItems: "center",
    justifyContent: "center",
});

const Content = g(Flex)({
    width: 400,
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
});

const Logo = g(Flex)({
    marginTop: 25,
    height: 120,
    width: 200,
    backgroundPosition: "center",
    background: "url(logo.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
});

const Input: any = g.input({
    fontSize: 20,
    padding: 10,
    marginBottom: 20,
    width: 250,
    boxSizing: "border-box",
});

const Button: any = g.button({
    fontSize: 20,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "black",
    color: "white",
    border: 0,
    width: 250,
    boxSizing: "border-box",
});

const Title = g(Flex)({
    fontSize: 35,
    margin: 20,
    fontWeight: "bold",
});

const Label = g(Flex)({
    fontSize: 25,
});

const Desc = g.p({
    textAlign: "justify",
});

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Content>
                <Logo />

                <Title>Hyppykurssiarvonta!</Title>

                <Desc>
                    Voita alkeiskurssin lahjakortti! Lahjakortti oikeuttaa
                    osallistumaan yhdelle alkeiskurssille kaudella 2018. Kurssi
                    sisältää yhden laskuvarjohypyn.
                </Desc>

                <Desc>
                    Arvonta suoritetaan huomenna sunnuntaina 8.10.2017. Arvonnan
                    voittaneelle ilmoitetaan sähköpostitse sekä puhelimitse.
                    Mikäli voittanut henkilö ei vastaa 48 tunnin kuluessa
                    arvonta suoritetaan uuudestaan.
                </Desc>

                <Label>Nimi</Label>
                <Input
                    value={this.state.name || ""}
                    onChange={(e: any) => this.setState({name: e.target.value})}
                />

                <Label>Sähköposti</Label>
                <Input
                    value={this.state.email || ""}
                    onChange={(e: any) =>
                        this.setState({email: e.target.value})}
                />

                <Label>Puhelin</Label>
                <Input
                    value={this.state.phone || ""}
                    onChange={(e: any) =>
                        this.setState({phone: e.target.value})}
                />

                <Button>Osallistu!</Button>
            </Content>
        );
    }
}

export default App;
