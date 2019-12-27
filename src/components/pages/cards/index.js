import React from 'react'
import Modal from 'react-modal'
import { clone, sortBy } from 'lodash'

// Images
import Loading from '../../../assets/images/loading.jpg'
import BingoCards from '../../../assets/images/cards.jpg'
import Header from '../../../assets/images/mark_panel.png'
import IconMatchStarter from '../../../assets/images/icn-match-start.svg'
import IconBingoBall from '../../../assets/images/icn-ball.svg'
import IconBingoCheckedBall from '../../../assets/images/icn-ball-claimed.svg'
import IconDots from '../../../assets/images/icn-dots.svg'
import IconHelp from '../../../assets/images/icn-help.svg'
import IconClose from '../../../assets/images/icon_close.png'
import PlayerImg from '../../../assets/images/img-player.png'
import FinalModal from '../../../assets/images/final.jpg'
import HelpImg1 from '../../../assets/images/img-help-1.png'
import HelpImg2 from '../../../assets/images/img-help-2.png'
import HelpImg3 from '../../../assets/images/img-help-3.png'

const eventNames = ['first points', 'pts +foal', 'crossover', 'intercept', 'dunk', '3 pointer', 'alley oop', 'free throw +1', 'block', 'winning basket', 'steal', 'free throw +2']

const allEvents = [
  {
    cardId: 0,
    cardNumber: 0,
    event: 1,
    time: 8,
    name: 'D.Martin',
  },
  { 
    cardId: 1,
    cardNumber: 88,
    event: 2,
    time: 2,
    name: 'D.Lynch',
  },
  { 
    cardId: 2,
    cardNumber: 35,
    event: 1,
    time: 11,
    name: 'G.Long',
  },
  { 
    cardId: 3,
    cardNumber: 40,
    event: 1,
    time: 55,
    name: 'M.Jack',
  },
  { 
    cardId: 4,
    cardNumber: 88,
    event: 2,
    time: 30,
    name: 'K.Sam',
  },
  { 
    cardId: 5,
    cardNumber: 32,
    event: 3,
    time: 45,
    name: 'C.Ronaldo',
  },
  { 
    cardId: 6,
    cardNumber: 5,
    event: 3,
    time: 50,
    name: 'L.Messi',
  },
  { 
    cardId: 7,
    cardNumber: 8,
    event: 2,
    time: 35,
    name: 'W.Koala',
  },
  { 
    cardId: 8,
    cardNumber: 13,
    event: 4,
    time: 25,
    name: 'A.Martin',
  },
  { 
    cardId: 9,
    cardNumber: 3,
    event: 1,
    time: 97,
    name: 'D.Alex',
  },
  { 
    cardId: 10,
    cardNumber: 5,
    event: 2,
    time: 20,
    name: 'J.Sergey',
  },
  { 
    cardId: 11,
    cardNumber: 20,
    event: 4,
    time: 85,
    name: 'R.Gong',
  },
  { 
    cardId: 12,
    cardNumber: 7,
    event: 4,
    time: 90,
    name: 'L.Hmmm',
  },
  { 
    cardId: 13,
    cardNumber: 24,
    event: 2,
    time: 80,
    name: 'D.Martin',
  },
  { 
    cardId: 14,
    cardNumber: 24,
    event: 1,
    time: 65,
    name: 'H.Ko',
  },
  { 
    cardId: 15,
    cardNumber: 22,
    event: 3,
    time: 70,
    name: 'R.Ali',
  },
  { 
    cardId: 16,
    cardNumber: 9,
    event: 4,
    time: 75,
    name: 'S.Tomy',
  },
  { 
    cardId: 17,
    cardNumber: 3,
    event: 3,
    time: 51,
    name: 'W.Philips',
  },
  { 
    cardId: 18,
    cardNumber: 5,
    event: 1,
    time: 68,
    name: 'A.Windsor',
  },
  { 
    cardId: 19,
    cardNumber: 10,
    event: 3,
    time: 73,
    name: 'S.Feaster',
  },
  { 
    cardId: 20,
    cardNumber: 8,
    event: 3,
    time: 15,
    name: 'J.Inglis',
  },
  { 
    cardId: 21,
    cardNumber: 13,
    event: 1,
    time: 83,
    name: 'D.Martin',
  },
  { 
    cardId: 22,
    cardNumber: 5,
    event: 1,
    time: 115,
    name: 'T.Lynch',
  },
  { 
    cardId: 23,
    cardNumber: 9,
    event: 3,
    time: 150,
    name: 'D.Short',
  },
  { 
    cardId: 24,
    cardNumber: 19,
    event: 4,
    time: 135,
    name: 'D.Daniels',
  },
]

const bingoCards = [
  {
    cardId: 3,
    letter: 'B'
  }, 
  {
    cardId: 8,
    letter: 'I'
  }, 
  {
    cardId: 13,
    letter: 'N'
  }, 
  {
    cardId: 18,
    letter: 'G'
  }, 
  {
    cardId: 23,
    letter: 'O'
  },
]

class Cards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 1,
      slideOpen: false,
      helpModalOpen: false,
      finalModalOpen: false,
      cards: [...allEvents],
      occuredEvents: [],
      bingoEvents: [],
      bingoStatus: 'loading'
    }
  }

  componentDidMount() {
    this.counter = 0
    this.allEvents = sortBy(allEvents, (o) => o.time )
    setTimeout(() => this.setState({ status: 2 }), 2000)
    setTimeout(() => { this.setState({ status: 3 }); this.bingoStart(); }, 4000)
  }

  componentWillUnmount() {
    clearInterval(this.clr)
  }

  bingoStart = () => {
    const that = this
    this.setState({ bingoStatus: 'started' })
    this.clr = setInterval(function () {
      that.counter++
      that.allEvents.forEach(e => {
        if (e.time === that.counter) {
          let occuredEvents = clone(that.state.occuredEvents)
          occuredEvents.push(e)
          that.setState({ occuredEvents })
          let bEvent = bingoCards.filter(b => b.cardId === e.cardId)
          if (bEvent.length !== 0) {
            let bingoEvents = clone(that.state.bingoEvents)
            bingoEvents.push(bEvent[0])
            that.setState({ bingoEvents })
          }
        }
      })
    }, 1000) 
  }

  tapTile = (index) => {
    let { occuredEvents } = this.state
    let cards = clone(this.state.cards)
    let bingoEvents = clone(this.state.bingoEvents)
    
    if (occuredEvents.filter(e => e.cardId === index).length !== 0) {
      cards[index].tapped = true
      bingoEvents.forEach(e => { if(e.cardId === index) e.checked = true })
      this.setState({ cards, bingoEvents })
      if (bingoEvents.length === 5 && bingoEvents.every((e) => e.checked)) {
        setTimeout(() => this.setState({ bingoStatus: 'done' }), 1500)
        // setTimeout(() => this.setState({ finalModalOpen: true }), 2000)
        clearInterval(this.clr)
      }
    }
  }

  render() {
    const { 
      status,
      slideOpen,
      bingoStatus,
      occuredEvents,
      bingoEvents,
      helpModalOpen,
      finalModalOpen,
      cards
    } = this.state

    const lastOccuredEvent = occuredEvents.length !== 0 ? occuredEvents[occuredEvents.length-1] : null
    const lastBingoEvent = bingoEvents.length !== 0 ? bingoEvents[bingoEvents.length-1] : null

    return (
      <div className="page-content cards-page">
        { status === 1 && <img className="page-img" src={Loading} alt="" /> }
        { status === 2 && <img className="page-img" src={BingoCards} alt="" /> }
        { status === 3 && (
          <>
            <div className={`top ${slideOpen ? 'blur' : ''}`}>
              <div className="title">
                <span>BINGO</span>
                <span>HOT HAND</span>
              </div>
              <img className="header" src={Header} alt="" />
              <div className="event-status" onClick={() => this.setState({ slideOpen: true })}>
                <div className={`event ${lastOccuredEvent !== null? 'active': ''}`}>
                  {
                    lastOccuredEvent !== null
                      ? `${lastOccuredEvent.cardNumber}  ${lastOccuredEvent.name} - ${eventNames[lastOccuredEvent.event-1]}`
                      : 'Live Match Feed...'
                  }
                </div>
                <img src={IconDots} alt="" />
              </div>
            </div>

            <div className={`bingo-field ${slideOpen ? 'opened' : 'closed'}`}>
              <div className="tiles">
                <div className="cards-content">
                  {
                    cards.map((c, i) => {
                      let bingoEvent = bingoEvents.filter(b => b.cardId === i)
                      let isBingoCard = bingoEvent.length !== 0
                      return (
                        <>
                          {
                            (bingoStatus === 'done' && isBingoCard) ?
                              <div className="card-content" key={i}>
                                <div className="card done" >
                                  {bingoEvent[0].letter}
                                </div>
                              </div>
                              :
                              <div key={i} className={`card-content`}>
                                <div 
                                  className={`card ${c.tapped ? (isBingoCard ? 'isBingo' : 'tapped') : ''} ${lastOccuredEvent !== null && lastOccuredEvent.cardId === i && !c.tapped ? 'highlighted': ''}`}
                                  onClick={bingoStatus !== 'done' ? () => this.tapTile(i) : null}
                                >
                                  <span className="number">{c.cardNumber}</span>
                                  <span className="action">{eventNames[c.event - 1]}</span>
                                  <img className="playerImg" src={PlayerImg} alt="" />
                                </div>
                              </div>
                          }
                        </>
                      )
                    })
                  }
                </div>
              </div>
              <div className="sliding-pane">
                <div className="feed-text bold">Live Match Feed</div>
                <div className="match-quarter">
                  <div className="match-feed bold" onClick={() => this.setState({ slideOpen: false })}>1ST QUARTER</div>
                  <div className="events">
                    {
                      clone(occuredEvents).reverse().map((e, i) => {
                        let bingoEvent = bingoEvents.filter(b => b.cardId === e.cardId)
                        let isBingoEvent = bingoEvent.length !== 0
                        let isBingoChecked = isBingoEvent && bingoEvent[0].checked

                        return (
                          <div className="event" key={i}>
                            <div className="info">
                              <div className="time">10:00</div>
                              <div>
                                <div className="name bold">{e.cardNumber} <span style={{color: '#BABABA'}}>- {e.name}</span></div>
                                <div className="event-name bold">{eventNames[e.event-1]}</div>
                              </div>
                            </div>
                            { 
                              isBingoEvent && (
                                !isBingoChecked ? 
                                  <img className="ball-icon" src={IconBingoBall} alt="" />
                                  :
                                  <img className="ball-icon" src={IconBingoCheckedBall} alt="" />
                              ) 
                            }
                          </div>
                        )
                      })
                    }
                    {
                      bingoStatus === 'started' && (
                        <div className="event">
                          <div className="info">
                            <div className="time">10:00</div>
                            <div>
                              <div className="event-name bold">Match started</div>
                            </div>
                          </div>
                          <img className="ball-icon" src={IconMatchStarter} alt="" />
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className={`down ${slideOpen ? 'blur' : ''}`}>
              <div className={`bingo-status ${lastBingoEvent !== null ? 'active' : ''}`}>
                { bingoEvents.length !== 5 && lastBingoEvent === null && 'Tap a tile to see more information' }
                { bingoEvents.length !== 5 && lastBingoEvent !== null  && !lastBingoEvent.checked && 'Calling Out!' }
                { bingoEvents.length !== 5 && lastBingoEvent !== null  && lastBingoEvent.checked && 'Very well. Keep on!' }
                { bingoEvents.length === 5 && lastBingoEvent !== null  && !lastBingoEvent.checked && 'Called Out! Hit it!' }
                { bingoStatus !== 'done' && bingoEvents.length === 5 && bingoEvents.every((e) => e.checked) && 'Great job!' }
                { bingoStatus === 'done' && <span className="winner bold">YOU ARE A WINNER!</span> }
              </div>
              <div className="footer">
                <img src={IconHelp} alt="" onClick={() => this.setState({ helpModalOpen: true })} />
                <div className="indicater" />
              </div>
            </div>
          </>
        )}

        <Modal
          key="help-tile"
          className="help-modal"
          isOpen={helpModalOpen}
          onRequestClose={() => this.setState({ helpModalOpen: false })}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
        >
          <div className="help-modal-content">
            <div className="title">Rules to play</div>
            <ul className="rules">
              <li>Wait till action from your tile Called Out.</li>
              <li>Claim a tile on your Bingo Card.</li>
              <li>Must make a horizontal, diagonal OR vertical line to get a BINGO</li>
            </ul>
            <div className="help-imgs">
              <div className="help-img"><img src={HelpImg1} alt="" /></div>
              <div className="help-img"><img src={HelpImg2} alt="" /></div>
              <div className="help-img"><img src={HelpImg3} alt="" /></div>
            </div>
            <div className="footer">
              <img src={IconClose} alt="" onClick={() => this.setState({ helpModalOpen: false })} />
              <div className="indicater" />
            </div>
          </div>
        </Modal>

        <Modal
          key="final-tile"
          className="final-modal"
          isOpen={finalModalOpen}
          onRequestClose={() => this.setState({ finalModalOpen: false })}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
        >
          <div className="final-modal-content">
            <img className="page-img" src={FinalModal} alt="" />
          </div>
        </Modal>
      </div>
    );
  }
}

export default Cards;
