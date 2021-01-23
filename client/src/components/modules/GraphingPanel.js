import React, { Component } from "react";
import { create, all } from 'mathjs';
import JXG from 'jsxgraph';
import assign from 'lodash/assign'

const math = create(all)
  class GraphingPanel extends Component {
    constructor(props) {
      super(props);
      this.id = 'board_' + Math.random().toString(36).substr(2, 9)
      this.state = { board: null,  initialGraphingFinished: false}
      this.defaultStyle = { width: 500, height: 500 }
      this.defauflboardAttributes = { axis: true, boundingbox: [-12, 10, 12, -10] }
    };
  
    componentDidMount() {
      // now that div exists, create new JSXGraph board with it
      let attributes = {}
      Object.assign(attributes, this.defauflboardAttributes, this.props.boardAttributes || {})
      let board = JXG.JSXGraph.initBoard(this.id, attributes)
      board.suspendUpdate();
      this.setState({
        board: board
      })
    }

    render () {
      let style = assign(this.defaultStyle, this.props.style || {})
      if (this.state.board !== null && this.props.functions.length>0 && this.state.initialGraphingFinished ===false) {
        this.state.board.suspendUpdate();
        this.props.functions.map((functionObj) => (
        this.state.board.create('curve', [function(t){return t;},
        function(t){return math.evaluate(functionObj.exp,{x:t});}, Number(functionObj.leftRange), Number(functionObj.rightRange)], { strokeColor: '#aa2233', strokeWidth: 3 })
        ));
        this.state.board.unsuspendUpdate();
        this.setState({
          initialGraphingFinished:true
        })
      }
      return (
        <>
          <div id={this.id} className={'jxgbox ' + this.props.className} style={style} />
        </>
        )
      }
    }

   export default GraphingPanel;