import React from 'react';

import './scrollable.css';
// import { scrolslToBottom } from '../../reducers/LayoutReducer';

class Scrollable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentDidMount() {
		// scrollToBottom();
	}

	render() {
		const { id, scrollX } = this.props;

		return (
			<div className={`scrollable ${scrollX ? 'scrollX' : 'scrollY'}`} id={id}>
				{this.props.children}
			</div>
		)
	}
}

export default Scrollable;
