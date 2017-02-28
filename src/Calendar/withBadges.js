import {
  compose,
  withProps,
  withPropsOnChange,
  withState,
} from 'recompose';
import {withDefaultProps} from './';
import {sanitizeDate, withImmutableProps} from '../utils';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

export const enhanceDay = withImmutableProps(({renderSelection}) => ({
  renderSelection: (values, props) => {
    
    return (
      <div>
        Day
      </div>
    );
  },
}));

// Enhancer to handle selecting and displaying a single date
export const withBadges = compose(
  withDefaultProps,
  withImmutableProps(({
    DayComponent,
    setScrollDate,
  }) => ({
    DayComponent: enhanceDay(DayComponent),
  })),
  withState('scrollDate', 'setScrollDate', props => props.selected || new Date()),
  withProps(({onSelect, setScrollDate, ...props}) => {
    const selected = sanitizeDate(props.selected, props);

    return {
      passThrough: {
        Day: {
          onClick: onSelect,
        },
      },
      selected: selected && format(selected, 'YYYY-MM-DD'),
    };
  }),
);
