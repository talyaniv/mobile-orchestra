/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({show}) =>
  <div className="lds-ripple" style={ {display: show ? 'block' : 'none'} }>
    <div></div>
    <div></div>
  </div>