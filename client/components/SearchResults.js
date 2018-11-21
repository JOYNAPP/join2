import React from 'react'
import axios from 'axios'

const API_KEY ='O3DBTMVQNBMLTN6OQSXM'
//const searchTerm ='music'


export default class Container extends React.Component {
  constructor () {
    super()
    this.state = { data: []}
    this.fetchEvents('music')
  }


  fetchEvents(searchTerm) {
    return axios
      .get(
        `https://www.eventbriteapi.com/v3/events/search/?q=${searchTerm}&token=${API_KEY}`,
      )
      .then(({ data }) => {
   this.setState({ data: data.events})
   //console.log(this.state)
  // console.log(data.events, 'data')

      })
      .catch(error => {
          console.log(error);
      });
  }




  render () {
   // this.fetchEvents('music')
  console.log('searchresults' , this.state.data[1].description.text)



    return (
      <div>
                  {this.state.data.map(event => {
            return (
              <div key={event.id}>
                    <div >
                      {event.name}}
                  </div>
              </div>
            )
          })}

       </div>
    )
  }
}
