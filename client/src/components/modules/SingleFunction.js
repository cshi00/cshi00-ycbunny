import React, { Component } from "react";
import { create, all } from 'mathjs';

import "./SingleFunction.css";
import { post } from "../../utilities";
const math = create(all);
import MathJax from 'react-mathjax-preview'
/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} creator_name
 * @param {string} exp math expression
 * @param {number} leftRange 
 * @param {number} rightRange 
 */

class SingleFunction extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  deleteFunction = (id) => {
    post("/api/functiondelete", {id: id,}).then(this.props.deleteOldFunction(id));
  };

  handleDelete = (event) => {
    event.preventDefault();
    console.log(this.props._id);
    this.deleteFunction(this.props._id);
  };


  render() {
    let tex = math.parse(this.props.exp).toTex();
    return (
      <div >
        <span>y = </span>
        <MathJax math={"$"+ tex + "$"} />
        <span>x from {this.props.leftRange} to {this.props.rightRange}</span>
        <button
          type="submit"
          className="NewPostInput-button u-pointer"
          value="Submit"
          onClick={this.handleDelete}
        >
        Delete
        </button>
      </div>
    );
  }
}

export default SingleFunction;
