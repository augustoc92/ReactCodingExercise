import React from 'react'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getEvents, isEventsReady, getEventsError } from '../selectors'
import Icon from './Icon'
import titleIcon from '../icons/vivid-angle-top-left.svg'
import theme from '../style/theme'
import Event from './Event'
import Spinner from './ui/spinner'

const Events = (state) => {
  const results = `Results: ${state.events.length} events found`
  const { classes } = state
  return (
    <div className={classes.container}>
      <h3 className={classes.title}>
        <Icon className={classes.titleIcon} symbol={titleIcon} />
        { results }
      </h3>
      { checkState(state) }
    </div>
  )
}

const checkState = ({ ready, error, classes, events }) => {
  if (!ready && error) {
    return (
      <div className={classes.error}>
        App could not load because of the following error { error.message } contact the administrator
      </div>
    )
  }
  if (!ready) {
    return (
      <div>
        <p>Loading...</p>
        <Spinner />
      </div>
    )
  }
  if (ready) {
    return (
      <div className={classes.tilesWrapper}>
        <div className={classes.tiles}>
          {events.map(event => <Event key={event.id} className={classes.tile} content={event} />)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  error: getEventsError(state),
  ready: isEventsReady(state),
  events: getEvents(state)
})

export default compose(
  connect(mapStateToProps),
  injectSheet({
    title: {
      paddingLeft: 20,
      position: 'relative'
    },
    titleIcon: {
      position: 'absolute',
      left: 0,
      top: 5
    },
    tilesWrapper: {
      margin: [0, 'auto'],
      maxWidth: theme.maxTileWidth,
      '@media (min-width: 768px)': {
        maxWidth: theme.maxTileWidth * 2 + theme.gutter
      },
      '@media (min-width: 1200px)': {
        maxWidth: theme.maxTileWidth * 3 + theme.gutter * 2
      }
    },
    tiles: {
      '@media (min-width: 768px)': {
        marginLeft: -theme.gutter / 2,
        marginRight: -theme.gutter / 2,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
      }
    },
    error: {
      color: 'red',
      fontSize: '35px',
      fontFamily: 'rift, Impact, Haettenschweiler, Helvetica Inserat, Arial Narrow, sans serif'
    },

    tile: {
      margin: [0, 'auto', theme.gutter],
      maxWidth: theme.maxTileWidth,
      '@media (min-width: 768px)': {
        marginLeft: theme.gutter / 2,
        marginRight: theme.gutter / 2,
        width: `calc(50% - ${theme.gutter}px)`
      },
      '@media (min-width: 1200px)': {
        width: `calc(${100 / 3}% - ${theme.gutter}px)`
      }
    }
  })
)(Events)
