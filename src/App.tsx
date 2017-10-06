import * as React from "react";
import "./App.css";
import g from "glamorous";
import {css} from "glamor";
import * as idb from "idb-keyval";

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

const getResponses = async () => idb.get<Array<any> | null>("responses");

const download = async e => {
    e.preventDefault();
    const responses: Array<any> = (await getResponses()) || [];

    const text = responses
        .map(res => `${res.date}	${res.name}	${res.email}	${res.phone}`)
        .join("\n");

    var pom = document.createElement("a");

    pom.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text),
    );
    pom.setAttribute("download", "vastaukset.tsv");

    if (document.createEvent) {
        var event = document.createEvent("MouseEvents");
        event.initEvent("click", true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
};

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {values: {}};
    }

    setFromInput = (name, e) => {
        this.setState({
            values: {
                ...this.state.values,
                [name]: e.target.value,
            },
        });
    };

    submit = async e => {
        e.preventDefault();
        const responses: Array<any> = (await getResponses()) || [];

        responses.push({
            date: new Date().toISOString(),
            ...this.state.values,
        });

        await idb.set("responses", responses);
        this.setState({values: {}});
        alert("kiitos");
    };

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
                    value={this.state.values.name || ""}
                    onChange={this.setFromInput.bind(this, "name")}
                />

                <Label>Sähköposti</Label>
                <Input
                    value={this.state.values.email || ""}
                    onChange={this.setFromInput.bind(this, "email")}
                />

                <Label>Puhelin</Label>
                <Input
                    value={this.state.values.phone || ""}
                    onChange={this.setFromInput.bind(this, "phone")}
                />

                <Button onClick={this.submit}>Osallistu!</Button>

                <g.Div marginTop={500}>
                    <Desc>
                        Tää on ns.{" "}
                        <a href="https://developers.google.com/web/progressive-web-apps/">
                            PWA
                        </a>{" "}
                        eli ei tartte verkkoyhteyttä toimiakseen eikä tallenna
                        verkkoon yhtään mitään. Kaikki tallentuu sun koneelle.
                    </Desc>
                    <g.A href="#" onClick={download}>
                        Lataa vastaukset
                    </g.A>
                </g.Div>
            </Content>
        );
    }
}

export default App;
