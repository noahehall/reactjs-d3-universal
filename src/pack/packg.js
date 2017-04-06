/* eslint-disable */
import * as d3 from 'd3';
import Datalist from './datalist.js';
import React from 'react';
import Stats from './stats.js';
import Label from './label.js';

/**
 * wraps a set of pack nodes inside a <g> element
 */
export default class PackG extends React.Component {
  static get defaultProps () {
    return {
      colorScale: () => null,
      d: {},
      foreignObject: [],
      id: '',
      idx: '0',
      labels: [],
      nozoom: false,
    };
  }

  static propTypes = {
    colorScale: React.PropTypes.func,
    d: React.PropTypes.object,
    foreignObject: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.array,
    ]),
    id: React.PropTypes.string,
    idx: React.PropTypes.string,
    labels: React.PropTypes.array,
    nozoom: React.PropTypes.bool,
  }

  static contextTypes = {
    Popup: React.PropTypes.func,
  }

  constructor (props) {
    super(props);
    const foreignObjects = [];
    if (props.foreignObject.length)
      props.foreignObject.forEach((foreignObject, idx) =>
        foreignObjects.push(
          <Datalist foreignObject={foreignObject} idx={idx} key={idx} />
        )
      );

    this.state = {
      fontSize: '5px',
      opacity: 1,
      pop: false,
      previous: false,
      r: 0,
      scale: 1,
      scaled: false,
      scaling: false,
      vizCon: false,
      x: 0,
      y: 0,
      foreignObjects,
    };
  }

  componentDidMount () {
    const vizCon = document.getElementById(`${this.props.id}-visual-container`).firstElementChild.firstElementChild;
    this.setState({
      pop: this.state.foreignObjects.length && this.context.Popup.register({
        className: null,
        content: this.state.foreignObjects,
        title: null,
      }),
      previous: this.g.previousElementSibling,
      vizCon: vizCon,
    });
  }

  closePopup = () => this.context.Popup.prototype.handleButtonClick((popup) =>
    popup.close()
  )

  /**
   * Queues a popup to be displayed
   */
  showPopup = (Popup = this.context.Popup, pop = this.state.pop) =>
    Popup.queue(pop);

  updateStateDimensions = () => {
    if (this.state.vizCon && this.state.vizCon !== this.g) {
      if (!this.state.scaled)
        this.setState({
          x: 1,
          y: 1,
          scale: this.props.chartWidth/2/this.props.d.r,
          scaled: true,
        });
      else {
        this.setState({
          x: this.props.d.x,
          y: this.props.d.y,
          scale: 1,
          scaled: false,
        });
        // TODO: move the 1000 delay to app API
        setTimeout(() => {
          this.state.previous.parentNode.insertBefore(this.g, this.state.previous.nextSibling);
        }, 1000);
      }
    }
  }

  /**
   * updates x, y and r dimensions for a set of pack nodes
   */
  updateDimensions = () => {
    if (typeof window !== 'undefined'  && !this.props.foreignObject.length) {
      if (!this.state.scaled && this.state.vizCon && this.state.vizCon !== this.g) { // scale it up
        this.state.vizCon.appendChild(this.g);
      }
      if (window.requestAnimationFrame)
        window.requestAnimationFrame(this.updateStateDimensions);
      else
        window.setTimeout(() => this.updateStateDimensions, 1);
    }
  }

  /**
   * zooms in/out of a pack node
   */
  handleZoom = () => {
    this.updateDimensions();
  }

  render () {
    const {
      colorScale,
      d,
      idx,
      labels,
    } = this.props;

    return (
      <g
        className={`pack-g depth-${d.depth}`}
        id={idx}
        key={idx}
        onClick={(e) => {
          e.stopPropagation();
          if (!this.props.nozoom) this.handleZoom();
        }}
        ref={(g) => this.g = g}
        style={{
          cursor: !this.props.nozoom ? 'pointer' : 'auto',
          opacity: this.state.opacity,
          transform: `translate(${this.state.x || this.props.d.x}px, ${this.state.y || this.props.d.y}px) scale(${this.state.scale})`,
          transition: 'transform 1s',
        }}
      >
        { // show label for white packs
         d.depth === 2 &&
            <Label
              className={`pack-g-labeldepth-${d.depth}`}
              d={d}
              idx={idx}
              labels={['name']}
              scale={this.state.scale}
              r={d.r}
            />
        }
        { // show + icon
         d.depth === 2 &&
            <text
              className={`pack-g-handle depth-${d.depth}`}
              textLength='20'
              lengthAdjust='spacing'
              style={{ // TODO: add transform handle margin to modifiable props
                transform: `translate(-${d.r + 10}px) scale(1)`,
                transition: 'transform 1s',
                cursor: 'pointer',
              }}
              >{this.state.scale > 1 ? '-' : '+'}</text>
        }
        <circle
          className={`pack-g-circle depth-${d.depth}`}
          r={this.props.d.r}
          style={{
            fill: d.children ? colorScale(d.depth) : 'white',
            "stroke":"#fff",
            "strokeWidth":"1.5px",
          }}
          onClick={(e) => {
            if (this.state.foreignObjects.length) {
              this.showPopup();
            }
          }}
        />
        { // show text for white packs
         !d.children &&
            <Label
              className={`pack-g-circle-labeldepth-${d.depth}`}
              d={d}
              idx={idx}
              labels={labels}
              scale={this.state.scale}
              r={d.r}
            />
        }
        { // show stats for foreignObjects
          this.props.foreignObject.length &&
          <Stats
            className={`pack-g-circle-stats depth-${d.depth}`}
            r={d.r}
            showPopup={this.showPopup}
            value={String(this.props.d.value)}
          />
        }
        {this.props.children || null}
      </g>
    );
  }
}
