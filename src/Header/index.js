import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';
const style = require('./Header.scss');
const animation = require('./Animation.scss');

export default class Header extends Component {
	static propTypes = {
		layout: PropTypes.string,
		locale: PropTypes.object,
		onClick: PropTypes.func,
		selectedDate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
		rangeSelectionEndDate: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
		shouldHeaderAnimate: PropTypes.bool,
		theme: PropTypes.object,
		display: PropTypes.string
	};
	shouldComponentUpdate(nextProps) {
		return shallowCompare(this, nextProps);
	}
	getDateValues() {
		let {display, locale, scrollToDate, setDisplay, selectedDate, rangeSelectionEndDate} = this.props;

		var values = [{
			item: 'day',
			key: selectedDate.format('YYYYMMDD'),
			value: selectedDate.format(locale.headerFormat),
			active: (display === 'days'),
			title: (display === 'days') ? `Scroll to ${selectedDate.format(locale.headerFormat)}` : null,
			handleClick: (e) => {
				e && e.stopPropagation();

				if (display !== 'days') {
					setDisplay('days');
				} else if (selectedDate) {
					scrollToDate(selectedDate, -40);
				}
			}
		}];

		if(selectedDate && rangeSelectionEndDate && !selectedDate.isSame(rangeSelectionEndDate)) {
			values[0].item = "start";
			var numDays = rangeSelectionEndDate.diff(selectedDate,'days')+1;
			values.push({
				item: 'end',
				key: rangeSelectionEndDate.format('YYYYMMDD'),
				value: locale.rangeLabel+" "+rangeSelectionEndDate.format(locale.headerFormat),
				rangeHint: <i>{numDays} days</i>,
				active: (display === 'days'),
				title: (display === 'days') ? `Scroll to ${rangeSelectionEndDate.format(locale.headerFormat)}` : null,
				handleClick: (e) => {
					e && e.stopPropagation();

					if (display !== 'days') {
						setDisplay('days');
					} else if (rangeSelectionEndDate) {
						scrollToDate(rangeSelectionEndDate, -40);
					}
				}
			});
		}

		return values;
	}
	render() {
		let {layout, locale, selectedDate, rangeSelectionEndDate, shouldHeaderAnimate, theme} = this.props;
		let dateValues = selectedDate && this.getDateValues();

		return (
			<div className={classNames(style.root, {[style.blank]: !selectedDate, [style.landscape]: layout == 'landscape'})} style={theme && {backgroundColor: theme.headerColor, color: theme.textColor.active}}>
				{(selectedDate) ?
					<div className={style.wrapper} aria-label={selectedDate.format(locale.headerFormat + ' YYYY')}>
						{dateValues.map(({handleClick, item, key, value, active, title,rangeHint}) => {
							return (
								<div key={item} className={classNames(style.dateWrapper, style[item], {[style.active]: active})} title={title}>
									<ReactCSSTransitionGroup transitionName={animation} transitionEnterTimeout={250} transitionLeaveTimeout={250} transitionEnter={shouldHeaderAnimate} transitionLeave={shouldHeaderAnimate}>
										<span key={`${item}-${key || value}`} className={style.date} aria-hidden={true} onClick={handleClick}>
											{value} {rangeHint}
										</span>
									</ReactCSSTransitionGroup>
								</div>
							);
						})}
					</div>
				: <div className={style.wrapper}>{locale.blank}</div>}
			</div>
		);
	}
}
