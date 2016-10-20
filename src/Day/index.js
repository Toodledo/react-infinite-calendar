import React from 'react';
const style = require('./Day.scss');

export default function Day({currentYear, date, day, badge, handleDayClick, handleDayDown, handleDayOver, handleDayUp, handleTouchStart, rangeSelection, isDisabled, isToday, isSelected, isHovered, dragging, isSelectedBetween, isSelectedEnd, monthShort, locale, theme}) {
	var {date: mmt, yyyymmdd} = date;
	var year = mmt.year();

	var highlightStyle = style.selection;

	var backgroundColor = (typeof theme.selectionColor == 'function') ? theme.selectionColor(mmt) : theme.selectionColor;

	var today = new Date();
	var badgeStyle = style.badge;
	if(date.date && date.date.isBefore(today)) badgeStyle += " "+style.badge_overdue;

	var dayContainerStyles = {};
	if (isToday) dayContainerStyles.color = theme.todayColor;

	if (rangeSelection) {
		if(isSelected && (!isSelectedEnd || dragging!==0)) highlightStyle += " "+style.selectionStart;
		else if(!isSelected && isSelectedEnd) highlightStyle += " "+style.selectionEnd;
		else if(!isSelected && !isSelectedEnd && isSelectedBetween) highlightStyle += " "+style.selectionBetween;

		if(dragging==1 && !isSelected && !isDisabled) backgroundColor = (typeof theme.selectionColor == 'function') ? theme.selectionColor(mmt) : theme.selectionColor;
		else if(dragging==-1 && !isSelectedEnd && !isDisabled) backgroundColor = (typeof theme.selectionColor == 'function') ? theme.selectionColor(mmt) : theme.selectionColor;
		else if(isDisabled) backgroundColor = (typeof theme.selectionDisabledColor == 'function') ? theme.selectionDisabledColor(mmt) : theme.selectionDisabledColor;

		var isSelectedRange = isSelected || isSelectedBetween || isSelectedEnd;

		if (isSelectedRange) dayContainerStyles.backgroundColor = theme.selectionRangeColor;

		var selectedStart = isSelected && (!isSelectedEnd || dragging!==0) ? style.selectedStart : "";
		var selectedEnd = isSelectedEnd ? style.selectedEnd : "";

		var rangeContainerStyles = `${selectedStart} ${selectedEnd}`;
	}

	return (
		<li
			style={dayContainerStyles}
			className={`${style.root} ${isToday ? style.today : ''} ${isSelected || isSelectedRange ? style.selected : ''} ${rangeContainerStyles ? rangeContainerStyles : ""} ${isDisabled ? style.disabled : style.enabled}`}
			data-date={yyyymmdd}
			onClick={(!isDisabled && handleDayClick) ? handleDayClick.bind(this, mmt) : null}
			onMouseDown={(!isDisabled && handleDayDown) ? handleDayDown.bind(this, mmt) : null}
			onMouseOver={(!isDisabled && handleDayOver) ? handleDayOver.bind(this, mmt) : null}
			onMouseUp={(!isDisabled && handleDayUp) ? handleDayUp.bind(this, mmt) : null}
			onTouchStart={(!isDisabled && handleDayUp) ? handleTouchStart.bind(this, mmt) : null}
		>
			{(day === 1) && <span className={style.month}>{monthShort}</span>}
			<span>{day}</span>
			{(badge!=="") && <span className={badgeStyle}>{badge}</span>}
			{(day === 1 && currentYear !== year) && <span className={style.year}>{year}</span>}
			{(isSelected || isSelectedEnd) &&
				<div className={highlightStyle} style={{backgroundColor: backgroundColor, color: theme.textColor.active}}>
					<span className={style.month}>{(isToday) ? (locale.todayLabel.short || locale.todayLabel.long) : monthShort}</span>
					<span className={style.day}>{day}</span>
				</div>
			}
			{(isSelectedBetween) &&
				<div className={highlightStyle} style={{backgroundColor: theme.selectionRangeColor, color: theme.textColor.active}}>
					<span className={style.day}>{day}</span>
				</div>
			}
		</li>
	);
}
