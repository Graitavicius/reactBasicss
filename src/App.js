import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";
import Radium, { StyleRoot } from "radium";

class App extends Component {
  state = {
    people: [
      { id: "asdasdasgfasg", name: "Maxiii", age: 28 },
      { id: "kaldlbfdmb", name: "Maxu", age: 29 },
      { id: "dbmcxbsflg", name: "Maxik", age: 26 },
    ],
    otherState: "some other value",
    showPeople: false,
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.people.findIndex((p) => {
      return p.id === id;
    });
    const person = {
      ...this.state.people[personIndex],
    };
    person.name = event.target.value;

    const people = [...this.state.people];
    people[personIndex] = person;

    this.setState({
      people: people,
    });
  };

  deletePersonHandler = (personIndex) => {
    //const people = this.state.people.slice();
    const people = [...this.state.people];
    people.splice(personIndex, 1);
    this.setState({ people: people });
  };

  togglePeopleHandler = () => {
    const doesShow = this.state.showPeople;
    this.setState({ showPeople: !doesShow });
  };

  render() {
    const style = {
      backgroundColor: "green",
      color: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "lightgreen",
        color: "black",
      },
    };

    let people = null;

    if (this.state.showPeople) {
      people = (
        <div>
          {this.state.people.map((person, index) => {
            return (
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)}
              />
            );
          })}
        </div>
      );
      style.backgroundColor = "red";
      style[":hover"] = {
        backgroundColor: "salmon",
        color: "black",
      };
    }

    const classes = [];
    if (this.state.people.length <= 2) {
      classes.push("red");
    }
    if (this.state.people.length <= 1) {
      classes.push("bold");
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(" ")}>This is really working!</p>
          <button style={style} onClick={this.togglePeopleHandler}>
            Toggle People
          </button>
          {people}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
