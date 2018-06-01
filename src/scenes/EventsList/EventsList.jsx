import React from 'react';
import jQuery from 'jquery';
import { connect } from 'react-redux';
import APIsConfig from '../../configs/api';
import { EventActionDeleteTry } from '../../actions';

class EventsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isLoading: false,
      events: [],
    };

    this.eventsFetched = this.eventsFetched.bind(this);
    this.tryToGetEvents = this.tryToGetEvents.bind(this);
  }

  componentDidMount() {
    this.tryToGetEvents();
  }

  eventsFetched(response) {
    this.setState({
      isLoaded: true,
      isLoading: false,
      events: response.result,
    });
  }

  tryToGetEvents() {
    this.setState({
      isLoading: true,
    });

    const type = APIsConfig.events.getEvents.method;
    const url = APIsConfig.events.url + APIsConfig.events.getEvents.endPoint;
    jQuery.ajax({
      type,
      url,
      success: this.eventsFetched,
      dataType: 'json',
    });
  }

  renderEvent(event, index) {
    return (
      <div className="col-sm-6" key={index}>
        <div className="panel panel-success">
          <div className="panel-heading">
            <h2 className="panel-title">{ event.name } </h2>
          </div>
          <div className="panel-body clearfix">
            <ul>
              <li>Artist: { event.artist }</li>
              <li>Addres: { event.eventAddress }</li>
              <li>Date: { event.date }</li>
              <li>Organizer: { event.organizer }</li>
              <li>Regular tickets number: { event.regularTicketsNumber }</li>
              <li>Premium tickets number: { event.premiumTicketsNumber }</li>
            </ul>
            <button
              type="button"
              className="btn btn-danger pull-right"
              onClick={() => this.props.EventActionDeleteTry(event.id)}
            >
            Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { events } = this.state;

    return (
      <div>
        {events.map((event, index) =>
          this.renderEvent(event, index))}
      </div>
    );
  }
}

export default connect(null, { EventActionDeleteTry })(EventsList);
