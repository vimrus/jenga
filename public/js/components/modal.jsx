//http://stackoverflow.com/questions/26787198/reactjs-modal-using-javascript-and-css
var React = require('react');
var ReactLayeredComponentMixin = {
    componentWillUnmount: function() {
        this._unrenderLayer();
        document.body.removeChild(this._target);
    },
    componentDidUpdate: function() {
        this._renderLayer();
    },
    componentDidMount: function() {
        // Appending to the body is easier than managing the z-index of everything on the page.
        // It's also better for accessibility and makes stacking a snap (since components will stack
        // in mount order).
        this._target = document.createElement('div');
        document.body.appendChild(this._target);
        this._renderLayer();
    },
    _renderLayer: function() {
        // By calling this method in componentDidMount() and componentDidUpdate(), you're effectively
        // creating a "wormhole" that funnels React's hierarchical updates through to a DOM node on an
        // entirely different part of the page.
        React.renderComponent(this.renderLayer(), this._target);
    },
    _unrenderLayer: function() {
        React.unmountComponentAtNode(this._target);
    }
};
var Modal = React.createClass({
    killClick: function(e) {
        // clicks on the content shouldn't close the modal
        e.stopPropagation();
    },
    handleBackdropClick: function() {
        // when you click the background, the user is requesting that the modal gets closed.
        // note that the modal has no say over whether it actually gets closed. the owner of the
        // modal owns the state. this just "asks" to be closed.
        this.props.onRequestClose();
    },
    render: function() {
        return this.transferPropsTo(
            <div className="ModalBackdrop" onClick={this.handleBackdropClick}>
            <div className="ModalContent" onClick={this.killClick}>
            {this.props.children}
            </div>
            </div>
            );
    }
});
var ModalLink = React.createClass({
    mixins: [ReactLayeredComponentMixin],
    handleClick: function() {
        this.setState({shown: !this.state.shown});
    },
    getInitialState: function() {
        return {shown: false, ticks: 0, modalShown: false};
    },
    renderLayer: function() {
        alert('iii');
        if (!this.state.shown) {
            return <span />;
        }
        return (
            <Modal onRequestClose={this.handleClick}>
            <h1>Hello!</h1>
            Look at these sweet reactive updates: {this.state.ticks}
            </Modal>
            );
    },
    render: function() {
        return <a href="javascript:;" role="button" onClick={this.handleClick}>Click to toggle modal</a>;
    }
});

module.exports = ModalLink;
